
import { createBrowserRouter,createHashRouter,RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './compontents/Layout'
import Home from './compontents/Home'
import Login from './compontents/Login'
import Register from './compontents/Register'
import Movies from './compontents/Movies'
import People from './compontents/People'
import Notfound from './compontents/Notfound'
import Tv from './compontents/Tv'
import ItemsDetails from './compontents/ItemsDetails'
import Acount from './compontents/Acount'
import UserContextProvider from './context/UserContext'
import ProtectedRoute from './compontents/ProtectedRoute'
import { Offline} from "react-detect-offline";

function App() {

  
const routers = createHashRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute> },
    {path:'home',element:<Home/>},
    {path:'tv',element: <ProtectedRoute><Tv/></ProtectedRoute> },
    {path:'people',element: <ProtectedRoute><People/></ProtectedRoute>  },
    {path:'movies',element: <ProtectedRoute><Movies/></ProtectedRoute> },
    {path:'ItemsDetails/:id/:mediaType',element:<ItemsDetails/>},
    {path:'acount',element: <ProtectedRoute><Acount/></ProtectedRoute> },
    {path:'login',element:<Login/>},
    {path:'register',element:<Register/>},
    {path:'*',element:<Notfound/>},
  ]}
])

  return<UserContextProvider>
    
    <Offline><div className="network text-muted px-4 bg-light  ">Sorry! you are offline <i className='fas fa-wifi-strong' ></i></div> </Offline>
    <RouterProvider router={routers}></RouterProvider>
        </UserContextProvider>
  
}
export default App
