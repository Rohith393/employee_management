import { useState } from "react"
import axios from 'axios'
import { useAuth } from "../authcontext"
import { useNavigate } from "react-router-dom"
export const Login=()=>{
    const[username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const[loading,setloading]=useState(false)
    const[message,setmessage]=useState('')
    const{logininfo}=useAuth();
    const navigate=useNavigate()
    const handlefunc=async()=>{
        if(!username||!password){
            setmessage('please fill both the fields')
            return;
        }
        setloading(true);
        try{
            const response=await axios.post('http://localhost:5000/api/users/login',{
                username,
                password,
            }, { 
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(response.status===200){
                console.log('Login response:', response.data);
                alert('login successfull');
                logininfo({
                    username: response.data.username
                });
                setusername('');
                setpassword('');
                setmessage('login successfull');
                navigate('/home');
            } else {
                setmessage("error , unexpected response format");
            }
        } catch(error){
            console.log('Error during login:', error); 
            if(error.response){
                setmessage("ERROR "+error.response.data.message)
            }else{
                setmessage("ERROR "+error.message)
            }
        } finally {
            setloading(false);
        }
    }
    const handleusernamevalue=(e)=>{
setusername(e.target.value)
    }
    const handlepasswordvlaue=(e)=>{
setpassword(e.target.value)
    }
    return(
        <div className="container">
              <div className="logo-container">
                <img src="pic1.png" alt="Logo" className="logo" /> 
            </div>
        <h3 className='headingcomp'>Login</h3>
        <div className="gapcomp">
        <div className="input-wrapper">
        <img src="account.png" alt="User Icon" className="icon" /> 
          <input
            className="inputstyles"
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleusernamevalue}
          />
        </div>
        <div className="input-wrapper">
          <img src="user.png" alt="Password Icon" className="icon" />
          <input
            className="inputstyles"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlepasswordvlaue}
          />
        </div>
            <button
             className="buttoncompo"
             onClick={handlefunc}
             disabled={loading}
             >
                {loading ? "Logging in......" : "Login"}
                </button>
                {message && <p style={{ color: "white" }}>{message}</p>}
                </div>
                </div>
    )
}