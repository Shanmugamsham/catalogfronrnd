import React from 'react';
import createusercontextdata from './Contextcreated';
import { useContext,useState,useEffect } from 'react';
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contextprovide = ({children}) => {
    const [isautheticate,setautheticate]=useState(false)
    const[isloading,setisloading]=useState(false)
    const [userregisterdata,setuseregisterdata]=useState({
        name:"",
        email:"",
        password:""
    })
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[userlogindata,setuserlogindata]=useState([])


    const [allcatalogue,setallcatalogue]=useState([])
    const [record,setrecord]=useState([])
    const [myprofile2, setmyprofile2] = useState({
      id: "",
      company: "",
      catalogSections: [
        {
          title: "",
          description: "",
          urls: [{ name: "", url: "" }]
        }
      ]
    });
    
      
    const [company,setcompany]=useState("")

      const [isupdate,setupdate]=useState(false)
      const [catalogSections, setCatalogSections] = useState([
        { title: '', description: '', urls: [{ name: '', url: '' }] }
      ]);
    const navigate=useNavigate()
  

 




    const getprofile=async()=>{

      try {
           setisloading(true)
            const token=  localStorage.getItem("token")
          const {data}= await axios.get(`https://catalogbackend-1.onrender.com/profile`,{headers:{
            "token":token
        },})
        setuserlogindata(data.data)
      setautheticate(true)
      await getallcatalogue()
           setisloading(false)
         } catch (error) {
           console.log(error);
           
          setautheticate(false)
           setisloading(false)
         toast.error(error.response.data.message, {
              position:"bottom-center",
              theme:"dark",
              });
         
          }
    
 }

   useEffect(()=>{
    const token=  localStorage.getItem("token")
    if(token){
      getprofile()
  //  }else{
    //   toast.warning("Please Register mail", {
    //     position:"bottom-center",
    //     theme:"dark",
    //     });
    // }
    }  
     },[])





















    const register=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userregisterdata.name)
        formData.append('email', userregisterdata.email)
        formData.append('password', userregisterdata.password)
    
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }}

        try {
            setisloading(true)
           const {data}= await axios.post(`https://catalogbackend-1.onrender.com/register`,formData,config)
             toast.success(data.message, {
                 position:"top-center",
                 theme:"light",
                });
                 navigate("/")
                 setuseregisterdata({...userregisterdata,name:"",password:"",email:"",})
               setisloading(false)
          } catch (error) {
           setisloading(false)
            toast.error(error.response.data.message, {
                position:"bottom-center",
                theme:"dark",
                });
         }
        }




const login=async(e)=>{
            e.preventDefault();
            try {
                setisloading(true)
               const {data}= await axios.post(`https://catalogbackend-1.onrender.com/login`,{email,password})
               localStorage.setItem('token',data.token);
                 toast.success(data.message, {
                     position:"top-center",
                     theme:"light",
                    });
                   setautheticate(true)
                     navigate("/dashboard")
                    setemail("")
                    setpassword("")
                    getprofile()
                     await getallcatalogue()
                 setisloading(false)
              } catch (error) {
               setisloading(false)
               console.log(error);
               toast.error(error.response.data.message, {
                   position:"bottom-center",
                   theme:"dark",
                   });
             }
            }
    


const logoutHandler=async()=>{
     
                try {
                    setisloading(true)
                     localStorage.removeItem('token');
                    setuserlogindata([])
                    setallcatalogue([])
                    setrecord([])
                   navigate("/")
                  toast.success("Logout Successfully", {
                    position:"bottom-center",
                    theme:"dark",
                    });
                  setautheticate(false)
                  setisloading(false)
                 } catch (error) {
                  setautheticate(false)
                  setisloading(false)
                  toast.error("Logout failed", {
                      position:"bottom-center",
                      theme:"dark",
                      });
                  
                 }
            
            }



 const catalogueadd=async(e)=>{
                e.preventDefault()
    
                const Datas = new FormData();
                Datas.append('company',company)
                Datas.append('catalogSections',JSON.stringify(catalogSections))
                const token=  localStorage.getItem("token")
                const config = {
                    headers: {
                        'Content-Type': 'application/json' ,
                         "token":token,
                    }}
                try {
                    setisloading(true)
                    setupdate(true)
                  const {data}= await axios.post(`https://catalogbackend-1.onrender.com/items`,Datas,config)
                  console.log(data);
                  
                   navigate("/dashboard")
                   await  getallcatalogue()
                   setcompany("")
                   setCatalogSections([
                    { title: '', description: '', urls: [{ name: '', url: '' }] } 
                  ]);
                toast.success(data.message, {
                    position:"bottom-center",
                    theme:"dark",
                    });
                    setupdate(false)
                  setisloading(false)
                 } catch (error) {
                    console.log(error);
                    
                    setupdate(false)
                  setisloading(false)
                  toast.error(error.response.data.message, {
                      position:"bottom-center",
                      theme:"dark",
                      });
                  
                 }
             
            }
    













            const getallcatalogue=async()=>{
                
                try {
                     setisloading(true)
                     const token=  localStorage.getItem("token")
                    const {data}= await axios.get(`https://catalogbackend-1.onrender.com/allitems`,{headers:{
                      "token":token
                  },})
                  console.log(data);
                  setallcatalogue(data.data)
                  setrecord(data.data)
                    setisloading(false)
                   } catch (error) {
                    setisloading(false)
                   toast.error(error.response.data.message, {
                        position:"bottom-center",
                       theme:"dark",
                       });
                   
                   }
              
          }


          const getcatalogueupdate=async(e)=>{
            console.log("FORMUPDATAFUNCTION");
            console.log(myprofile2);
            
            
            const Datas = new FormData();
            Datas.append('id', myprofile2.id)
            Datas.append('company', myprofile2.company)
            Datas.append('catalogSections', JSON.stringify( myprofile2.catalogSections))
            const token=  localStorage.getItem("token")
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    "token":token
                }}
                
            try {
                setisloading(true)
                setupdate(true)
              const {data}= await axios.put(`https://catalogbackend-1.onrender.com/items/${myprofile2.id}`,Datas,config)
              navigate("/dashboard")
              
              await  getallcatalogue()
            toast.success(data.message, {
                position:"bottom-center",
                theme:"dark",
                });
                setupdate(false)
              setisloading(false)
             } catch (error) {
                setupdate(false)
              setisloading(false)
              toast.error(error.response.data.message, {
                  position:"bottom-center",
                  theme:"dark",
                  });
              
             }
         
        }


        const deletecatalogue=async(id)=>{
     
            try {
                setisloading(true)
                const token=  localStorage.getItem("token")
                const {data}= await axios.delete(`https://catalogbackend-1.onrender.com/items/${id}`,{headers:{
                  "token":token
              },})
              setallcatalogue([])
                navigate("/dashboard")
                await  getallcatalogue()
              toast.success(data.message, {
                position:"bottom-center",
                theme:"dark",
                });
              setisloading(false)
             } catch (error) {
              setisloading(false)
              toast.error(error.response.data.data, {
                  position:"bottom-center",
                  theme:"dark",
                  });
              
             }
        
        }
           
        

            
            
   
    



    return (
        <div>
        <createusercontextdata.Provider value={{isautheticate,setautheticate,userregisterdata,setuseregisterdata,isloading,register,
            email,setemail,password,setpassword,login,userlogindata, logoutHandler,getallcatalogue,allcatalogue,getcatalogueupdate
            ,myprofile2,setmyprofile2,isupdate,setupdate,deletecatalogue,company,setcompany,catalogueadd,setallcatalogue,record,
            setrecord,catalogSections, setCatalogSections}}>
        <ToastContainer theme="dark"/>   
        {children}
        </createusercontextdata.Provider>
            
        </div>
    );
};

export default Contextprovide;