import { useState } from "react";

export const Login = ({ onSuccess }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail,
                userPassword
            })
        })
        .then((res) => res.json())
        .then((data) => {
            onSuccess(data);
            console.log(data);
        })
        .catch((e)=> {
            console.log(e);
        })
    }

    return (
        <form onSubmit={handleLogin} >
            <input 
                placeholder="Email"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
            />
            <input
                placeholder="Password"
                type="password"
                onChange={(e) => setUserPassword(e.target.value)}
                value={userPassword}
            />
            <button>Login</button>
        </form>
    )
}