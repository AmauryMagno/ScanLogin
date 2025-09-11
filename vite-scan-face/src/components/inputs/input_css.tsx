import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const StyledInput = styled.input`
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
`;

export const EyeIcon = styled.img`
  position: absolute;
  right: 10px;
  cursor: pointer;
  width: 25px;
  height: 25px;
`;