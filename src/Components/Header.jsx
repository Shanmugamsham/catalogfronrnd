

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Image, Navbar, Nav } from 'react-bootstrap';
import createusercontextdata from '../Context/Contextcreated';

const Header = () => {
  const { isautheticate, userlogindata, logoutHandler } = useContext(createusercontextdata);
  const navigate = useNavigate();

  return (
    <Navbar  expand="lg" className="shadow-sm navbg fixed-top">
      <Navbar.Brand as={Link} to="/">
        <img width="50px" src="/images/catalog.png" alt="Catalog Logo" />
      </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isautheticate ? (
            <div className="d-flex flex-row align-items-center">
              <Link to="/dashboard" className="btn btn-primary m-2 ">Dashboard</Link>
              <Link to="/add" className="btn btn-warning m-2  m-2 d-none d-md-block"> <span className='mr-1'><i className="fa fa-plus" aria-hidden="true"> </i></span>Add</Link>
              
              <Dropdown align="end">
                <Dropdown.Toggle variant="default"  id="user-dropdown" className="text-white">
                  <span>{userlogindata.name}</span>
                  <br />
                  <span>{userlogindata.email}</span>
                </Dropdown.Toggle>
                

                <Dropdown.Menu >
              <Dropdown.Item><Link to="/add" className="btn btn-warning   d-sm-block d-md-none"> <span className='mr-1'><i className="fa fa-plus" aria-hidden="true"> </i></span>Add</Link></Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/myprofile')} >Profile</Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler} className="text-danger">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <div>
              <Link to="/Register" className="btn login_btn m-2">Sign Up</Link>
              <Link to="/login" className="btn login_btn m-2">Login</Link>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
