import styled, { css, keyframes } from 'styled-components'

export const CameraContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
`

export const CameraContent = styled.video`
    border-radius: 12px;
    border: 2px solid #333;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`

export const CameraCanvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    pointer-events: none;
`
export const ContainerButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const ButtonEscanear = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #3eabc9;
    color: white;
    font-weight: 700;
    font-size: large;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
`
