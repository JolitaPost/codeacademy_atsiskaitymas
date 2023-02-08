import styled from "styled-components";
import { Link } from "react-router-dom";

 export const NotFoundStyled = styled.div`
    background-image: linear-gradient(79deg, #7439db, #C66FBC 48%, #F7944D );
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    color: white;
    align-self: center;
`;

export const LinkStyled = styled(Link)`
    align-self: center;
    color: white;
    font-size: 18px;
    font-weight: 400;
    padding: 10px;
    text-decoration: none; 
`;