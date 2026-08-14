import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminPage from "./admin/AdminPage";
import AddProducts from "./admin/AddProducts";
import Edit from "./admin/Edit";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProductList from "./admin/ProductList";
import ProductCard from "./Pages/ProductCard";
import Cart from "./Pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },{
    path:"/register",
    element:<Register/>
  },{
    path:"/login",
    element:<Login/>
  },{
    path:'/admin/add-product',
    element:<AddProducts/>
  },{
    path:'/admin',
    element:<AdminPage/>
  },{
    path:'/admin/products',
    element:<ProductList/>
  },
  {
    path:'/products/:id',
    element:<ProductCard/>
  },{
    path:'/admin/products/update/:id',
    element:<Edit/>
  },{
    path:'/cart',
    element:<Cart/>
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
