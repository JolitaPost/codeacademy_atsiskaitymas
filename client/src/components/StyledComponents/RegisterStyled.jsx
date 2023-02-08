import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Form } from "../Form/Form";


export const RegisterContainer = styled.div`
    align-items: center;
    background-image: linear-gradient(79deg, #7439db, #C66FBC 48%, #F7944D );
    display: flex;
    justify-content: center;
    height: 100vh;
`;

export const LinkStyled = styled(Link)`
    align-self: center;
    color: white;
    font-size: 18px;
    font-weight: 400;
    padding: 10px;
    text-decoration: none; 
`;

export const LabelStyled = styled.label`
    color: white;
    font-size: 16px;
    font-weight: 400;
    padding: 0.25rem 0;
`;

export const FormStyled = styled(Form)`
    max-width: 100%;
    padding: 20px;
    width: 400px;
`;

export const ErrorStyled = styled.div`
    color: red;
    text-align: center;
`;

export const TitleStyled = styled.h1`
    align-self: center;
    color: white;   
`;

export const EventTitleStyled = styled.h1`
    align-self: center;
    color: #7439db;
`;
