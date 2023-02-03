import styled from 'styled-components';

export const AttendeesContainer = styled.div`
    
`;

export const AttendeesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
`;

export const AttendeesListItem = styled.li`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
    cursor: pointer;
    display: flex;    
    justify-content: space-between;
    overflow: hidden;
    padding: 10px 30px;
    position: relative;
`;

export const AttendeeName = styled.span`
    color: darkslateblue;
    font-size: 24px;
    font-weight: 700;

`;

export const AttendeeData = styled.span`
    color: grey;
    font-size: 20px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

