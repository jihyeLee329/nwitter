import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home'
import Profile from 'routes/Profile';
import Navigation from './Navigation';

const AppRouter = ({refreshUser, isLoggedIn, userObj})=>{
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? (
                <>
                    <Route path="/" element={<Home userObj={userObj}/>} />
                    <Route path="/profile" element={ <Profile userObj={userObj} refreshUser={refreshUser}/>} />
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