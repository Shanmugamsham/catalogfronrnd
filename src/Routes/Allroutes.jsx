import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Contextprovide from '../Context/Contextprovide';
import Header from '../Components/Header';
import Loginpage from '../Components/Loginpage';
import Profile from '../Components/Profile';
import Registerpage from '../Components/Registerpage';
import Home from '../Components/Home';
import Cateloguepage from '../Components/Cateloguepage';
import Edit from '../Components/Edit';
import Addcatalogue from '../Components/Addcatalogue';
import Catalogdetails from '../Components/Catalogdetails';
const Allroutes = () => {
    return (
        <div>
             <BrowserRouter>
            <Contextprovide>
            <Header/>
            <Routes>
           <Route path='/header'element={<Header/>}/>
           <Route path='/' element={<Home/>}/> 
           <Route path='/login'element={<Loginpage/> }/> 
           <Route path='/myprofile'element={<Profile/>}/>
           <Route path='/dashboard'element={<Cateloguepage/>}/>
           <Route path='/edit'element={<Edit/>}/>
           <Route path='/:company/:id' element={<Catalogdetails />} />
           {/* <Route path="/items/:id" element={<Catalogdetails/>} /> */}
           <Route path='/add'element={<Addcatalogue/>}/>
           <Route path='/Register'element={<Registerpage/>}/> 
           </Routes>
           </Contextprovide>
          </BrowserRouter>
        </div>
    );
};

export default Allroutes;