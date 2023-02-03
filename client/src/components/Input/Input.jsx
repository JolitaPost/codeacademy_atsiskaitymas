import styled from "styled-components";

export const InputStyled = styled.input`
    border: 1px solid lightgrey;
    border-radius: 10px;
    font-size: 16px;
    flex-grow: 1;
    padding: 10px 20px;

    &:disabled {
        opacity: 0.5;
    }
`;

export const Input = (props) => {
    return <InputStyled {...props} />
}
