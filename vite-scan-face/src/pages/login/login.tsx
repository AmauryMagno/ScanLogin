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
import { Camera } from "../../components/camera/camera";

export const Login = (): JSX.Element => {
    // const authContext = useContext(Context)
    const [isAnimatingExit, setIsAnimatingExit] = useState(false);
    const [isAnimatingLoad, setIsAnimatingLoad] = useState(false);

    // Estado para utilizacao das Mensagens
    const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "aviso" | "erro"; mensagem: string } | null>(null);

    // Navegação entre paginas
    const navigate = useNavigate();

    // Função para comparar embedding do rosto com os embeddings salvos no cache
    const handleEmbeddigs = async (detections: any) => {
        // Verifica se o vetor existe em caching
        const embeddingsExistentes = JSON.parse(localStorage.getItem('embeddings') || '[]');

        const rostoReconhecido = compararEmbeddings(detections.descriptor, embeddingsExistentes);

        if (rostoReconhecido) {
            setMensagem({ tipo: "sucesso", mensagem: "Rosto reconhecido, seja bem vindo!" });
        } else {
            setMensagem({ tipo: "aviso", mensagem: "Rosto não reconhecido" });
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

    // Animação de entrada
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimatingLoad(true);
        }, 50);
        return () => clearTimeout(timer)
    }, []);

    // Navegar para pagina de cadastro
    const navigateToCadastro = () => {
        setIsAnimatingExit(true);

        setTimeout(() => {
            navigate('/register')
        }, 750);
    }

    return (
        <Container>
            {mensagem && (
                <Mensagens mensagem={mensagem?.mensagem} tipo={mensagem?.tipo} />)}
            <LadoEsquerdo>
                <AreaInput>
                    <AreaTitulo>
                        <Titulo>Login</Titulo>
                        <Texto> por favor centralize seu rosto para efetuar Login</Texto>
                    </AreaTitulo>
                    <Camera onScan={handleEmbeddigs} infoMessage={setMensagem} />
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