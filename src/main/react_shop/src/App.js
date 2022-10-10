import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PageRouter from './router/PageRouter';
import BootPageRouter from './router/BootPageRouter';


const App = () => (
    <BrowserRouter>
        <PageRouter/>
        <BootPageRouter/>
    </BrowserRouter>
);

export default App;