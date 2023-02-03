import { useEffect, useState } from "react";
import { LOGGED_IN_USER } from "../../utils/constants";
import { AttendeeData, AttendeeName, AttendeesList, AttendeesListItem, AttendeesContainer } from "../../components/StyledComponents/AttendeesStyled";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/attendees?userId=${LOGGED_IN_USER.id}`)
            .then(res => res.json())
            .then(data => {
                setAttendees(data);
                setIsLoading(false);
             });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleAttendeeAdd = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/attendees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                telephone,
                userId: LOGGED_IN_USER.id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setAttendees(data);
            setName('');
            setSurname('');
            setEmail('');
            setTelephone('');

        });
    }

    return (
        <AttendeesContainer>
        <h1>Event attendees</h1>
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
            <AttendeesListItem key={attendee.id}>
                <AttendeeName>{attendee.name}</AttendeeName>
                <AttendeeName>{attendee.surname}</AttendeeName>
                <AttendeeData>{attendee.email}</AttendeeData>
                <AttendeeData>{attendee.telephone}</AttendeeData>
            </AttendeesListItem>
            ))}
        </AttendeesList>
        </AttendeesContainer>
    );
}



