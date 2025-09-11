import { JSX, useState } from 'react';
import { EyeIcon, InputContainer, StyledInput } from './input_css';
import openEyeIcon from '../../assets/eye_open.svg';
import closeEyeIcon from '../../assets/eye_closed.svg';

interface InputPasswordProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPassword = ({ value, onChange }: InputPasswordProps): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <InputContainer>
            <StyledInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={value}
                onChange={onChange}
            />
            <EyeIcon
                src={showPassword ? openEyeIcon : closeEyeIcon}
                alt="Icone do olho"
                onClick={togglePasswordVisibility}
            />
        </InputContainer>
    );
}