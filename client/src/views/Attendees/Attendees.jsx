import { useEffect } from "react";
import { useState } from "react";
import { LOGGED_IN_USER } from "../../utils/constants";
import { AttendeeData, AttendeeName, AttendeesList, AttendeesListItem } from "../../components/StyledComponents/AttendeesStyled";

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


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

    return (
        <AttendeesList>
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



