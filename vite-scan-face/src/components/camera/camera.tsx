import React, { JSX, useEffect, useRef, useState, type SetStateAction } from "react"
import { ButtonEscanear, ContainerButton } from "./camera_css";
import * as faceapi from "face-api.js";
import { loadModels } from "../../utils/faceAPI";

interface CameraProps {
    onScan: (embedding: any) => void;
    infoMessage?: React.Dispatch<SetStateAction<{ tipo: "sucesso" | "aviso" | "erro"; mensagem: string; } | null>>;
}

let cameraStream: MediaStream | null = null;


export const Camera = ({ onScan, infoMessage }: CameraProps): JSX.Element => {

    //Configuracoes para acessar e usar Camera
    const videoReference = useRef<HTMLVideoElement>(null);
    const canvarReference = useRef<HTMLCanvasElement>(null);
    const [ready, setReady] = useState(false);

    // Carrega os modelos do face-api.js e inicia a câmera
    useEffect(() => {
        const initCamera = async () => {
            await loadModels();
            // Verifica se a camera ja foi iniciada e ativa se nao estiver
            if (videoReference.current) {
                if (!cameraStream) {
                    cameraStream = await navigator.mediaDevices
                        .getUserMedia({ video: true })
                }
                videoReference.current.srcObject = cameraStream;
            }
            setReady(true);
        };
        initCamera();
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
                faceapi.draw.drawDetections(canvarReference.current, faceapi.resizeResults(detections, { width: 640, height: 480 }));

                if (detections) {
                    onScan(detections);
                } else {
                    onScan(null);
                }
            } else {
                infoMessage?.({ tipo: "erro", mensagem: "Nenhum rosto foi encontrado." });
            }
        }
    };


    return (
        <>
            <div className="flex flex-col items-center gap-4" style={{ position: 'relative', width: 640, height: 480, alignItems: 'center' }}>
                <video
                    ref={videoReference}
                    autoPlay
                    muted
                    width="640"
                    height="480"
                    style={{ borderRadius: "12px", border: "2px solid #333", position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                />
                <canvas
                    ref={canvarReference}
                    width={640}
                    height={480}
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}
                />
            </div>
            <ContainerButton>
                {ready ? (
                    <ButtonEscanear
                        onClick={handleScan}

                    >
                        Escanear Rosto
                    </ButtonEscanear>
                ) : (
                    <p>Carregando modelos...</p>
                )}
            </ContainerButton>
        </>
    )
}