import styled, { css, keyframes } from 'styled-components'
import bkg_image from '../../assets/img-bkg-login.webp'

interface Props {
  isAnimating?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px); /* opcional: começa um pouquinho abaixo */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Lado Esquerdo com formulário de registro

export const Container = styled.div<Props>`
    display: flex;
    height: 100vh;
`
export const LadoEsquerdo = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const AreaInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 60%;
  animation: ${fadeIn} 1s ease forwards;
`
export const AreaTitulo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 5px;
`

export const Titulo = styled.div`
  font-size: 1.8em;
  font-weight: 700;
  color: rgb(51, 51, 51);
  letter-spacing: -0.8px;
  line-height: 1.2;
`

export const AreaInterrogativa = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
`

export const Texto = styled.text`
  color: rgb(138, 138, 138);
  letter-spacing: -0.8px;
  line-height: 1.2;
`

export const TextoLink = styled.text`
  font-weight: 700;
  color: rgb(62, 171, 201);
  letter-spacing: -0.8px;
  line-height: 1.2;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover{
    transform: scale(1.03);
  }
`

export const Input = styled.input`
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2%;
  border: 2px solid #ccc; 
  outline: none;
  color: #555;
  font-weight: 400;

  &:focus {
    border-color: #555;
  }
`

export const Botao = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: large;
  width: 100%;
  padding: 1%;
  border-radius: 8px;
  background-color:rgb(62, 171, 201);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover{
    transform: scale(1.03);
  }
`

/*-------------------------------------------------*/

// Lado Direito com imagem de fundo e animação
export const LadoDireito = styled.div<Props>`
  flex: 1;
  z-index: 10;
  background-image: url(${bkg_image});
  background-size: 200%;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.7s ease-in-out;
  ${({ isAnimating }) =>
    isAnimating &&
    css`
        transform: translateX(-100%);
      `}
`

export const Apresentacao = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;
    height: 90%;

    background: rgba(255, 255, 255, 0.17);
    border-radius: 30px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.2px);
    -webkit-backdrop-filter: blur(6.2px);
`
export const AreaTexto = styled.div<Props>`
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    width: 60%;
    transition: opacity 0.6s ease-in-out;
`

export const TextoApresentacao = styled.text<Props>`
    font-size: 3rem;
    font-weight: 350;
    transition: opacity 0.6s ease-in-out;
`