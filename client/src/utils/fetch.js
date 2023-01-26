//fetch(`${process.env.REACT_APP_API_URL}/attendees`, {
//    method: 'POST',
//    headers: {
//        'Content-Type': 'application/json'
//    },
//    body: JSON.stringify({})
//})
//.then(res => res.json())
//.then(data);

export const internalFetch = (url) => {  // skirta GET'ui
    return fetch(`${process.env.REACT_APP_API_URL}${url}`).then(res => res.json());
}