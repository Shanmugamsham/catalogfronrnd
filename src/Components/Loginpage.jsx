import React, { useContext } from 'react';
import createusercontextdata from '../Context/Contextcreated';
import Loading from './Loading';
import { Link } from 'react-router-dom';
const Loginpage = () => {
    const{email,setemail,password,setpassword,login,isloading}=useContext(createusercontextdata)
    return (
        <div>
       {isloading? <Loading/>:<div className="container  pt-5">
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form onSubmit={login} className="shadow-lg">
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                  autoComplete="on"
                required
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                  autoComplete="on"
                required
              />
            </div>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={isloading}
            >
              LOGIN
            </button>

            <Link to={"/register"} href="#" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
</div>}
        
        </div>
    );
};

export default Loginpage;