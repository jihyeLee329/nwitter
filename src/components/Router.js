import React,{useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home'
import Profile from 'routes/Profile';
import Navigation from './Navigation';

const AppRouter = ({isLoggedIn, userObj})=>{
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                <>
                    <Route path="/" element={<Home userObj={userObj}/>} />
                    <Route path="/profile" element={ <Profile />} />
                </> )
                : (
                <>
                    <Route exact path="/" element={ <Auth />} />
                </>)
                }
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;