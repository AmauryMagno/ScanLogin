import { JSX, useEffect, useRef, useState } from "react"
import {
    Apresentacao, AreaInput, AreaInterrogativa,
    AreaTexto, AreaTitulo, Container, LadoDireito,
    LadoEsquerdo, Texto, TextoApresentacao, TextoLink,
    Titulo
} from "./login_css"
import { useNavigate } from "react-router-dom";
import { AnimatedText } from "../../components/animated/animated-text/text";
import { Mensagens } from "../../components/messages/message";
import * as faceapi from "face-api.js";
import { loadModels } from "../../utils/faceAPI";
import { Camera } from "../../components/camera/camera";

export const Login = (): JSX.Element => {
    // const authContext = useContext(Context)
    const [isAnimatingExit, setIsAnimatingExit] = useState(false);
    const [isAnimatingLoad, setIsAnimatingLoad] = useState(false);

    //Configuracoes para acessar e usar Camera
    const videoReference = useRef<HTMLVideoElement>(null);
    const canvarReference = useRef<HTMLCanvasElement>(null);
    const [ready, setReady] = useState(false);

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            await loadModels();

            // Inicia câmera
            if (videoReference.current) {
                navigator.mediaDevices
                    .getUserMedia({ video: true })
                    .then((stream) => {
                        videoReference.current!.srcObject = stream;
                    });
            }
            setReady(true);
        };
        init();
    }, []);

    // Função para capturar o rosto e extrair o vetor (embedding)
    const handleScan = async () => {
        if (videoReference.current && canvarReference.current) {

            //Detecta o rosto e as landmarks
            const detections = await faceapi
                .detectSingleFace(videoReference.current)
                .withFaceLandmarks()
                .withFaceDescriptor();

            //Limpa o canvas antes de desenhar
            const canvas = canvarReference.current.getContext('2d');
            canvas?.clearRect(0, 0, canvarReference.current.width, canvarReference.current.height);

            if (detections) {
                console.log("Descricao do valores do rosto (embedding):", detections.descriptor);
                alert("Rosto com os (embedding) detectado e salvo no console.");
                faceapi.draw.drawDetections(canvarReference.current, faceapi.resizeResults(detections, { width: 640, height: 480 }));
                // Verifica se o vetor existe em caching
                const embeddingsExistentes = JSON.parse(localStorage.getItem('embeddings') || '[]');
                const rostoReconhecido = compararEmbeddings(detections.descriptor, embeddingsExistentes);

                if (rostoReconhecido) {
                    alert("Rosto reconhecido! Login efetuado com sucesso.");
                } else {
                    alert("Rosto não reconhecido. Tente novamente ou registre-se.");
                }

            } else {
                alert("Nenhum rosto foi encontrado.");
            }
        }
    };

    //Comparar embedding do rosto com os embeddings salvos no cache
    const compararEmbeddings = (novoEmbedding: Float32Array, embeddingsExistentes: number[][], threshold = 0.6): boolean => {
        for (const embeddingArray of embeddingsExistentes) {
            const embedding = new Float32Array(embeddingArray);
            const distance = faceapi.euclideanDistance(novoEmbedding, embedding);
            if (distance < threshold) {
                return true; // Rosto reconhecido
            }
        }
        return false; // Rosto não reconhecido
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimatingLoad(true);
        }, 50);
        return () => clearTimeout(timer)
    }, []);

    const navigateToCadastro = () => {
        setIsAnimatingExit(true);

        setTimeout(() => {
            navigate('/register')
        }, 750);
    }

    return (
        <Container>
            {message && <Mensagens tipo="erro" mensagem={message} />}
            <LadoEsquerdo>
                <AreaInput>
                    <AreaTitulo>
                        <Titulo>Login</Titulo>
                        <Texto> por favor centralize seu rosto para efetuar Login</Texto>
                    </AreaTitulo>
                    <Camera canvasRef={canvarReference} videoRef={videoReference} ready={ready} handleScan={handleScan} />
                    <AreaInterrogativa>
                        <Texto>
                            Não tenho uma conta!
                        </Texto>
                        <TextoLink onClick={navigateToCadastro}>Criar Conta</TextoLink>
                    </AreaInterrogativa>
                </AreaInput>
            </LadoEsquerdo>
            <LadoDireito isAnimating={isAnimatingExit}>
                <Apresentacao>
                    <AreaTexto>
                        <TextoApresentacao>
                            <AnimatedText text="Bem vindo" isAnimatingLoad={isAnimatingLoad} isAnimatingExit={isAnimatingExit} />
                        </TextoApresentacao>
                        <TextoApresentacao>
                            <AnimatedText text="de volta!" isAnimatingLoad={isAnimatingLoad} isAnimatingExit={isAnimatingExit} />
                        </TextoApresentacao>
                    </AreaTexto>
                </Apresentacao>
            </LadoDireito>
        </Container>
    )
}