import styled, { css } from 'styled-components'

interface LetterProps {
    index: number;
    isAnimatingLoad: boolean;
    isAnimatingExit: boolean;
}

export const Letter = styled.span<LetterProps>`
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: ${({ index }) => index * 0.05}s;
  white-space: pre;

  ${({ isAnimatingLoad, isAnimatingExit }) =>
        isAnimatingLoad && !isAnimatingExit &&
        css`
      opacity: 1;
      transform: translateY(0);
    `}

  ${({ isAnimatingExit }) =>
        isAnimatingExit &&
        css`
      opacity: 0;
      transform: translateY(20px);
    `}
`