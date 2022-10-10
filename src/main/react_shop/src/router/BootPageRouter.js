import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Hello, About } from '../pages/boot/Index';

class PageRouter extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route exact path="/hello/" element={<Hello/>}/>
                    <Route exact path="/hello/about" element={<About/>}/>
                </Routes>
                
            </div>
        );
    }
}

export default PageRouter;
