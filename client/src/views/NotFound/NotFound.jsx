import { NotFoundStyled, LinkStyled } from "../../components/StyledViews/NotFound";

export const NotFound = () => {
    return (
        <NotFoundStyled>
            <img src={process.env.PUBLIC_URL + "/TUX-G2-SVG.svg.png"} width="300" alt="logo" />
            <h1>Page not found</h1>
            <LinkStyled to="/">Go to Login page</LinkStyled>
        </NotFoundStyled>
    );
}