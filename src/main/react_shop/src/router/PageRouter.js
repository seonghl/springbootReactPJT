import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, About } from '../pages/app/Index';

class PageRouter extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/about" element={<About/>}/>
                </Routes>
                
            </div>
        );
    }
}

export default PageRouter;
