import styled from "styled-components";

export const FormStyled = styled(Form)`
    max-width: 100%;
    padding: 20px;
    width: 400px;
`;

const FieldsetStyled = styled.fieldset`
    border: 0;
    display: flex;
    flex-direction: ${({ column })=> column ? 'column' : 'row'};
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