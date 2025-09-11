import styled, { keyframes } from "styled-components"
interface MensagemContainerProps {
    tipo: 'erro' | 'aviso';
}

const slideDown = keyframes`
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const slideUp = keyframes`
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-100%);
        opacity: 0;
    }
`;

export const MensagemContainer = styled.div<MensagemContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    margin: 0 auto;
    margin-top: 5px;
    top: 0;
    left: 0;
    right: 0;
    width: 90%;
    padding: 8px;
    text-align: center;
    border-radius: 10px;
    z-index: 1000;
    font-size: 16px;
    font-weight: bold;
    background-color: ${({ tipo }) => (tipo === 'erro' ? '#FF6C2F' : '#FFA515 ')};

    &.enter{
        animation: ${slideDown} 0.5s ease-in-out;
    }

    &.exit{
        animation: ${slideUp} 0.5s ease-in-out;
    }
    
`

export const MensagemTexto = styled.p`
    margin: 0;
    padding: 10px;
`