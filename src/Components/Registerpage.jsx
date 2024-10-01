import React, { useContext,} from 'react';
import createusercontextdata from '../Context/Contextcreated';
import Loading from './Loading';
const Registerpage = () => {
    const{userregisterdata,setuseregisterdata,register,isloading}= useContext(createusercontextdata)
    const handleinputchange=(e)=>{
          const {name,value}=e.target
          setuseregisterdata({...userregisterdata,[name]:value})
       
    }
    if (isloading) {
      return <Loading />;
    }
    
    return (
        <div>
           <div className="container  pt-5 pb-5">
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={register} encType='multipart/form-data'>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" id="name_field" className="form-control" name='name' autoComplete="on"
             value={userregisterdata.name} onChange={handleinputchange} required/>
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                 name='email'
                value={userregisterdata.email} onChange={handleinputchange}
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
                 name='password'
                value={userregisterdata.password} onChange={handleinputchange}
                autoComplete="on"
                required
              />
            </div>
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={isloading}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>
</div>
        </div>
    );
};

export default Registerpage;