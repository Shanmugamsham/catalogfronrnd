import React, { useContext } from 'react';
import createusercontextdata from '../Context/Contextcreated';
import { Link } from 'react-router-dom';
const Profile = () => {
   
    const {userlogindata}=useContext(createusercontextdata)
    return (
        <div className='pt-5'>
            
            <div className="row justify-content-around mt-5 user-info">
            
            <div className="col-12 col-md-5">
            <h4>ID</h4>
            <p>{userlogindata.id}</p>

                <h4>Full Name</h4>
                <p>{userlogindata.name}</p>
    
                <h4>Email Address</h4>
                <p className='mb-5'>{userlogindata.email}</p>
                 

                <Link to={"/dashboard"} className="btn btn-primary">Back</Link>

            </div>
        </div>
        </div>
       
    );
};

export default Profile;