import { useEffect } from "react";
import { useState } from "react";
import { LOGGED_IN_USER } from "../../utils/constants";
import { AttendeeData, AttendeeName, AttendeesList, AttendeesListItem } from "../../components/StyledComponents/AttendeesStyled";

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
                userId: 1
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
        <AttendeesList>
            <form onSubmit={handleAttendeeAdd}>
                <input 
                    placeholder="Name" 
                    required 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input 
                    placeholder="Surname" 
                    required 
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                />
                <input 
                    placeholder="Email" 
                    required 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input 
                    placeholder="Telephone" 
                    type="number" 
                    required 
                    onChange={(e) => setTelephone(e.target.value)}
                    value={telephone}
                />
                <button>Add</button>
            </form>
            {attendees.map((attendee) => (
            <AttendeesListItem key={attendee.id}>
                <AttendeeName>{attendee.name}</AttendeeName>
                <AttendeeName>{attendee.surname}</AttendeeName>
                <AttendeeData>{attendee.email}</AttendeeData>
                <AttendeeData>{attendee.telephone}</AttendeeData>
            </AttendeesListItem>
            ))}
        </AttendeesList>
    );
}



