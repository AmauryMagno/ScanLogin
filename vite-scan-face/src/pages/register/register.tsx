import { JSX, useEffect, useState, useRef } from "react"
import {
    Apresentacao, AreaInput, AreaInterrogativa,
    AreaTexto, AreaTitulo, Container, LadoDireito,
    LadoEsquerdo, Texto, TextoApresentacao, TextoLink, Titulo
} from "./register_css"
import { AnimatedText } from "../../components/animated/animated-text/text"
import { useNavigate } from "react-router-dom";
import { Camera } from "../../components/camera/camera";
import * as faceapi from "face-api.js";
import { loadModels } from "../../utils/faceAPI";

export const Register = (): JSX.Element => {
    const [isAnimatingExit, setIsAnimatingExit] = useState(false);
    const [isAnimatingLoad, setIsAnimatingLoad] = useState(false);
    const navigate = useNavigate();

    //Configuracoes para acessar e usar Camera
    const videoReference = useRef<HTMLVideoElement>(null);
    const canvarReference = useRef<HTMLCanvasElement>(null);
    const [ready, setReady] = useState(false);


    // Animação de entrada
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimatingLoad(true);
        }, 50);
        return () => clearTimeout(timer)
    }, []);

    //Inicia os modelos e a camera
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


    // Função para navegar para a página de login com animação de saída
    const navigateToLogin = () => {
        setIsAnimatingExit(true);

        setTimeout(() => {
            navigate('/login')
        }, 750);
    }

    // Funcao para criar salvar o enbeding do rosto em caching
    const salvarEmbeddingNoCache = (embedding: Float32Array) => {
        const embeddings = JSON.parse(localStorage.getItem('embeddings') || '[]');
        embeddings.push(Array.from(embedding)); // Converte Float32Array para array normal
        localStorage.setItem('embeddings', JSON.stringify(embeddings));
    }

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

                // Salvar o vetor em caching
                salvarEmbeddingNoCache(detections.descriptor);

            } else {
                alert("Nenhum rosto foi encontrado.");
            }
        }
    };

    return (
        <Container>
            <LadoDireito isAnimating={isAnimatingExit}>
                <Apresentacao>
                    <AreaTexto>
                        <TextoApresentacao>
                            <AnimatedText text="Vamos" isAnimatingLoad={isAnimatingLoad} isAnimatingExit={isAnimatingExit} />
                        </TextoApresentacao>
                        <TextoApresentacao>
                            <AnimatedText text="Começar!" isAnimatingLoad={isAnimatingLoad} isAnimatingExit={isAnimatingExit} />
                        </TextoApresentacao>
                    </AreaTexto>
                </Apresentacao>
            </LadoDireito>
            <LadoEsquerdo>
                <AreaInput>
                    <AreaTitulo>
                        <Titulo>Criar Conta</Titulo>
                    </AreaTitulo>
                    <Camera canvasRef={canvarReference} videoRef={videoReference} ready={ready} handleScan={handleScan} />
                    <AreaInterrogativa>
                        <Texto>
                            Já tenho uma conta?
                        </Texto>
                        <TextoLink onClick={navigateToLogin}>Fazer Login</TextoLink>
                    </AreaInterrogativa>
                </AreaInput>
            </LadoEsquerdo>
        </Container>
    )
}