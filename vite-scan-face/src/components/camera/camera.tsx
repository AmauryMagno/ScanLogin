import { JSX } from "react"
import { ButtonEscanear, ContainerButton } from "./camera_css";


interface CameraProps {
    videoRef?: React.RefObject<HTMLVideoElement | null>;
    canvasRef?: React.RefObject<HTMLCanvasElement | null>;
    ready?: boolean;
    handleScan?: () => Promise<void>;
}


export const Camera = ({ videoRef, canvasRef, ready, handleScan }: CameraProps): JSX.Element => {
    return (
        <>
            <div className="flex flex-col items-center gap-4" style={{ position: 'relative', width: 640, height: 480, alignItems: 'center' }}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    width="640"
                    height="480"
                    style={{ borderRadius: "12px", border: "2px solid #333", position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                />
                <canvas
                    ref={canvasRef}
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