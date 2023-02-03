import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/Button/Button";
import { RegisterContainer } from "../../components/StyledComponents/RegisterStyled";
import { FormStyled } from "../../components/Form/Form";
import { LinkStyled } from "../../components/StyledComponents/LoginStyled";
import { InputStyled } from "../../components/Input/Input";


export const Register = () => {
    const navigate = useNavigate();
    const [ userName, setUserName ] = useState();
    const [ userSurname, setUserSurname ] = useState();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                userSurname,
                userEmail,
                userPassword
            })
        })
            .then((res) => res.json())
            .then((data) => {
                navigate('/login');
            })
    };

    return (
        <RegisterContainer>
            <FormStyled onSubmit={handleRegister} >
                <InputStyled
                    placeholder="Name"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}    
                 />
                <InputStyled
                    placeholder="Surname"
                    onChange={(e) => setUserSurname(e.target.value)}
                    value={userSurname}    
                />
                <InputStyled 
                    placeholder="Email"
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                />
                <InputStyled
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setUserPassword(e.target.value)}
                     value={userPassword}
                />        
                <Button>Register</Button>
                <LinkStyled to="/login">Login</LinkStyled>
            </FormStyled>
        </RegisterContainer>
    );
}