import { useContext, useEffect, useState } from "react";
//import styled from 'styled-components';
import { AttendeeData, AttendeesContainer, AttendeesList, AttendeesListItem, HoverOverlay,HoverOverlayContent, TitleStyled } from "../../components/StyledComponents/AttendeesStyled";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { UserContext } from '../../contexts/UserContextWrapper';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";


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
        <AttendeesContainer>
        <AttendeesList>
            <TitleStyled>Add new attendee</TitleStyled>
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
            <TitleStyled>Attendees list</TitleStyled>
            {attendees.map((attendee) => (
            <AttendeesListItem key={attendee.id} onClick={() => handleDeleteAttendee(attendee.id)} >
                <HoverOverlay>
                    <HoverOverlayContent>DELETE</HoverOverlayContent>
                </HoverOverlay>
                <AttendeeData>{attendee.name}</AttendeeData>
                <AttendeeData>{attendee.surname}</AttendeeData>
                <AttendeeData>{attendee.email}</AttendeeData>
                <AttendeeData>{attendee.telephone}</AttendeeData>
            </AttendeesListItem>
            ))}
        </AttendeesList>
    </AttendeesContainer>
    );
}



