import styled from "styled-components";

const FormStyled = styled.form`
    background-color: none;
    border: 1px solid white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0.5rem;
`;

const FieldsetStyled = styled.fieldset`
    border: 0;
    display: flex;
    flex-direction: ${({ column }) => column ? 'column' : 'row'};
    gap: 5px;
    padding: 0;
`;

export const Form = ({ children, disabled, onSubmit, column, ...props }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    }

    return (
        <FormStyled onSubmit={handleSubmit} {...props}>
            <FieldsetStyled disabled={disabled} column={column}>
                {children}
            </FieldsetStyled>
        </FormStyled>
    )
}
