import React from 'react';
import { Header, Footer } from './Main';

const Layout = (props) => {
    const {children, setContent, isOpenModal} = props;
    return (
        <>
            <Header />
                <main>
                {React.cloneElement(children, {setContent, isOpenModal})}
                </main>
            
            <Footer />
        </>
    )
};

export default Layout;