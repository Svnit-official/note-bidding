import React from 'react'
import NavBar from './components/NavBar/NavBar';
import ListRequest from './components/ListRequests/List';
import BottomNav from './components/BottomNav/BottomNav';
import Card from './components/Card/Card';
import AddButton from './components/AddButton/AddButton'

const App = () => {
    return (
        <div className="">
         <NavBar />
        <Card progress={2}/>
        <Card progress={3}/>
        <Card progress={4}/>
        <BottomNav />
        <AddButton />
        </div>
    )
}

export default App
