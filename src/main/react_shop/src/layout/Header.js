import { Link } from "react-router-dom";
import { Navbar, Container} from 'react-bootstrap'
//import { useAppContext } from "store";
//import { delToken } from "store";


const Header = () => {
  // const { store, dispatch } = useAppContext();
  //const { dispatch } = useAppContext();
  return (
    <nav class="site-header sticky-top py-1 bg-dark ">
      <div class="container d-flex flex-column flex-md-row justify-content-between ">
        <Link class="py-2 d-none d-md-inline-block text-white" to="/products/it">IT</Link>
        <Link class="py-2 d-none d-md-inline-block text-white" to="/products/foods">Foods</Link>
        <Link class="py-2 d-none d-md-inline-block text-white" to="/products/fashion">Fashion</Link>
        <Link class="py-2 d-none d-md-inline-block text-white" to="/cart">Cart</Link>
        
        {
        /*
        store.isAuthenticated ?  (
                                    <Link class="py-2 d-none d-md-inline-block text-white" to="/accounts/signin" onClick={(e) => { 
                                                                                                                                    e.preventDefault(); 
                                                                                                                                    dispatch(delToken());
                                                                                                                                  }
                                                                                                                          }>
                                      SignOut
                                    </Link>
                                  ) : 
                                  (
                                    <Link class="py-2 d-none d-md-inline-block text-white" to="/accounts/signin">SignIn</Link>
                                  )
        */
        }
        
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="insert keyword" aria-label="Search"/>
          <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}

export default Header;
