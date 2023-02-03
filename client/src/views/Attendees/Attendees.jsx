import { useContext, useEffect, useState } from "react";
//import { AttendeeData, AttendeeName, AttendeesList, AttendeesListItem, AttendeesContainer } from "../../components/StyledComponents/AttendeesStyled";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContextWrapper';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";

const HoverOverlay = styled.div`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
    display: flex;
    height: 100%auto;
    justify-content: center;
    left: 0;
    position: absolute;
    width: 100%;
`;

const HoverOverlayContent = styled.li`
    color: red;
    font-size: 16px;
`;

const AttendeesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
`;

const AttendeesListItem = styled.li`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
    cursor: pointer;
    display: flex;    
    justify-content: space-between;
    overflow: hidden;
    padding: 10px 30px;
    position: relative;

    ${HoverOverlay} {
        visibility: hidden;
    }

    &:hover {
        ${HoverOverlay} {
            visibility: visible;
        }
    }
`;

const AttendeeName = styled.span`
    color: darkslateblue;
    font-size: 24px;
    font-weight: 700;

`;
const AttendeeData = styled.span`
    color: grey;
    font-size: 20px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;


export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const { user } = useContext(UserContext);


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/attendees?userId=${user.id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setAttendees(data);
                }
                setIsLoading(false);
             });
    }, [user.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleAttendeeAdd = () => {
        fetch(`${process.env.REACT_APP_API_URL}/attendees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                telephone,
                userId: user.id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.error) {
                setAttendees(data);
                setName('');
                setSurname('');
                setEmail('');
                setTelephone('');
            }
        });
    }

    const handleDeleteAttendee = (id) => {
        if (window.confirm('Do you really want to delete this attendee?')) {
            fetch(`${process.env.REACT_APP_API_URL}/attendees/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
                }
            })
            .then(res => res.json())
            .then(data => {
                setAttendees(data);
            });
        }
    }

    return (
        <AttendeesList>
            <Form onSubmit={handleAttendeeAdd}>
                <Input 
                    placeholder="Name" 
                    required 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <Input 
                    placeholder="Surname" 
                    required 
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                />
                <Input 
                    placeholder="Email" 
                    required 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input 
                    placeholder="Telephone" 
                    type="number" 
                    required 
                    onChange={(e) => setTelephone(e.target.value)}
                    value={telephone}
                />
                <Button>Add</Button>
            </Form>
            {attendees.map((attendee) => (
            <AttendeesListItem key={attendee.id} onClick={() => handleDeleteAttendee(attendee.id)} >
                <AttendeeName>{attendee.name}</AttendeeName>
                <AttendeeName>{attendee.surname}</AttendeeName>
                <AttendeeData>{attendee.email}</AttendeeData>
                <AttendeeData>{attendee.telephone}</AttendeeData>
            </AttendeesListItem>
            ))}
        </AttendeesList>
    );
}



