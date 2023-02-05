import styled from "styled-components";

const ButtonStyled = styled.button`
    background-color: #7439db;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    margin: 10px 0;
    padding: 20px 40px;

    &:disabled {
        opacity: 0.5;
    }    
`;

export const Button = (props) => {
    return <ButtonStyled {...props} />
}