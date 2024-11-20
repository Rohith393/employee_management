import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Register=()=>{
    const [usernamefield,setusernamefield]=useState('')
    const[passwordfield,setpassworfield]=useState('')
    const[loading,setloading]=useState(false)
    const [message,setmessage]=useState('')
    const navigate=useNavigate()
    const handlefunc=async()=>{
        setloading(true)
        if(!usernamefield||!passwordfield){
            setmessage('please fill all the feilds')
        }
        try{
            const response=await axios.post('http://localhost:5000/api/users/register',{
                username:usernamefield,
                password:passwordfield,
            })
            if (response.status >= 200 && response.status < 300){
                alert('register success')
                setusernamefield('')
                setpassworfield('')
                setmessage('registered successfully')
                navigate('/login')
            }
        }catch(error){
            console.log("error while registering the user")
            alert("ERROR Please Provide Strong Passoword  ")
          setmessage('ERROR '+error.message)
        }
        finally{
            setloading(false)
        }
    }
    return(
        <div className="container">
              <div className="logo-container">
                <img src="pic2.png" alt="Logo" className="logo" /> 
            </div>
        <h3 className='headingcomp'>Create New Account</h3>
        <div className="gapcomp">
        <div className="input-wrapper">
        <img src="pic2.png" alt="User Icon" className="icon" />
    <input
    className="inputstyles"
    name="usernamefield"
  type="text"
  placeholder="username"
  value={usernamefield}
  onChange={(e)=>{setusernamefield(e.target.value)}}
    />
    </div>
    <div className="input-wrapper">
    <img src="password.png" alt="Password Icon" className="icon" />
      <input
      className="inputstyles"
    name="passwordfield"
  type="password"
  placeholder="password"
  value={passwordfield}
  onChange={(e)=>{setpassworfield(e.target.value)}}
    />
     </div>
     
    <button 
     className="buttoncompo" 
    onClick={handlefunc}
    disabled={loading}
    >
       {loading ? "Registering......" : "Register"}
    </button>
    {message && <p style={{ color: "white" }}>{message}</p>}
    </div>
    </div>
    )
}
