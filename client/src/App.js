import React from 'react'
import NavBar from './components/NavBar/NavBar';
import ListRequest from './components/ListRequests/List';
import BottomNav from './components/BottomNav/BottomNav';

const App = () => {
    return (
        <div >
         <NavBar />
        <ListRequest />
        <button>Add Request</button>
        <BottomNav />
        </div>
    )
}

export default App
