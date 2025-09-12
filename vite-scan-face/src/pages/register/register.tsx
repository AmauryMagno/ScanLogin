import { JSX, useEffect, useState, useRef } from "react"
import {
    Apresentacao, AreaInput, AreaInterrogativa,
    AreaTexto, AreaTitulo, Container, LadoDireito,
    LadoEsquerdo, Texto, TextoApresentacao, TextoLink, Titulo
} from "./register_css"
import { AnimatedText } from "../../components/animated/animated-text/text"
import { useNavigate } from "react-router-dom";
import { Camera } from "../../components/camera/camera";
import { Mensagens } from "../../components/messages/message";

export const Register = (): JSX.Element => {
    // Estados para controlar as animações de entrada e saída
    const [isAnimatingExit, setIsAnimatingExit] = useState(false);
    const [isAnimatingLoad, setIsAnimatingLoad] = useState(false);
    const navigate = useNavigate();

    // Estado para utilizacao das Mensagens
    const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "aviso" | "erro"; mensagem: string } | null>(null);

    // Animação de entrada
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimatingLoad(true);
        }, 50);
        return () => clearTimeout(timer)
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

    // Função para Salvar o vetor (embedding) do rosto capturado
    const saveFace = async (detections: any) => {
        if (detections) {
            // Salvar o vetor em caching
            salvarEmbeddingNoCache(detections.descriptor);
            setMensagem({ tipo: "sucesso", mensagem: "Rosto registrado com sucesso!" });
        }
    };

    return (
        <Container>
            {mensagem && (
                <Mensagens mensagem={mensagem?.mensagem} tipo={mensagem?.tipo} />)}
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
                    <Camera onScan={saveFace} infoMessage={setMensagem} />
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