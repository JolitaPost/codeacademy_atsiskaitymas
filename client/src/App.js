import { Route, Routes } from "react-router";
//import { internalFetch } from './utils/fetch';

function App() {

//  internalFetch('/attendees').then(data => )

  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home route</div>} />
        <Route path="/attendees" element={<div>Attendees route</div>} />
      </Routes>      
    </div>
  );
}

export default App;
