import { Letter } from "./text_css";

interface AnimatedTextProps {
    text: string;
    isAnimatingLoad: boolean;
    isAnimatingExit: boolean;
}

export const AnimatedText = ({ text, isAnimatingLoad, isAnimatingExit }: AnimatedTextProps) => {
    return (
        <span style={{ display: 'inline-block', whiteSpace: 'pre' }}>
            {text.split("").map((char, index) => (
                <Letter
                    key={index}
                    index={index}
                    isAnimatingLoad={isAnimatingLoad}
                    isAnimatingExit={isAnimatingExit}
                >
                    {char}
                </Letter>
            ))}
        </span>
    );
};