import styled from "styled-components";

export const AttendeesContainer = styled.div`
    background-image: linear-gradient(79deg, #7439db, #C66FBC 48%, #F7944D );
    display: flex;
    justify-content: left;
    height: 100vh;
`;

export const AttendeesList = styled.div`
    align-items: left;
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
    width: 100%;
`;

export const HoverOverlay = styled.div`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
    display: flex;
    height: 100% auto;
    justify-content: center;
    left: 0;
    position: absolute;
    width: 100%;
`;

export const HoverOverlayContent = styled.div`
    color: red;
    font-size: 24px;
`;

export const AttendeesListItem = styled.li`
    align-items: left;
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

export const AttendeeData = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;
export const TitleStyled = styled.h1`
    align-self: center;
    color: #7439db;   
`;
