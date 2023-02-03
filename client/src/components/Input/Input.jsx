import styled from "styled-components";

export const InputStyled = styled.input`
    border: 1px solid lightgrey;
    border-radius: 10px;
    font-size: 16px;
    flex-grow: 1;
    padding: 10px 20px;
`;

export const Input = (props) => {
    return <InputStyled {...props} />
}
