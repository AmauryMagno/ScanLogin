import { JSX, useState, useEffect } from 'react';
import { MensagemContainer, MensagemTexto } from './message_css';

interface MensagensProps {
    tipo: 'erro' | 'aviso';
    mensagem: string;
    onClose?: () => void;
}

export const Mensagens = ({ tipo, mensagem, onClose }: MensagensProps): JSX.Element | null => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                setIsVisible(false);
                if (onClose) {
                    onClose();
                }
            }, 500);
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!isVisible) {
        return null;
    }

    return (
        <MensagemContainer tipo={tipo} className={isExiting ? 'exit' : 'enter'}>
            <MensagemTexto>{mensagem}</MensagemTexto>
        </MensagemContainer>
    );
};