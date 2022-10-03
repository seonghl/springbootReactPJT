import { Header, Footer } from './Main';

const Layout = ({ children, match, location, history }) => {
    return (
        <>
            <Header />
            
            <main>
              {children}
            </main>

            <Footer />
        </>
    );
};

export default Layout;