import React from 'react'
import NavBar from './components/NavBar/NavBar';
import ListRequest from './components/ListRequests/List';

const App = () => {
    return (
        <div>
         <NavBar />
        <ListRequest />
        <button>Add Request</button>
        </div>
    )
}

export default App
