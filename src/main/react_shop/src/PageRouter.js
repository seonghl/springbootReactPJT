// import { Layout } from "./layout/Layout";
// import Accounts from "pages/Accounts/Accounts";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
 import { BrowserRouter, Route } from "react-router-dom";
// import { Home, Products, Cart } from "./pages";
// import { products } from "./routers";


const PageRouter = () => {
  return (
    <BrowserRouter>
      {/* <Layout> */}
        {/* <Switch> */}
          <Route exact path="/" render={() => {
                                                <span>test home</span>;
                                              }}
          />
          {/* <Route path="/products" component={products} /> */}
          {/* <Route path="/accounts" component={Accounts} /> */}
        {/* </Switch> */}
      {/* </Layout> */}
    </BrowserRouter>
  );
};

export default PageRouter;