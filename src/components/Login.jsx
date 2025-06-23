import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../utils/constants';

const Login = () => {
    
    const [emailId, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [isLogin , setIsLogin] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignIn = async() =>{
        try{
            const res = await axios.post(BaseURL + "/signup" , {firstName , lastName , emailId , password } , {withCredentials : true})

             dispatch(addUser(res.data.data));

             return navigate("/profile");
            
        }catch(err){
            console.log(err.message)
        }
    }

    const handleLogin = async() => {
        
        try{
            const res = await axios.post(BaseURL + "/login" , {
                emailId , password
            } , { withCredentials: true }) 
             dispatch(addUser(res.data));

             return navigate("/");

        }catch(error) {
            setError(error?.response?.data);
            console.error("Login failed:", error);
            
        }
    }

return (
    <div>
        <div className="card bg-base-200 w-96 shadow-sm item-center mx-auto mt-10 mb-10 border border-1 border-[#56629d] ">
            <div className="card-body">
                <h2 className="card-title flex justify-center text-lg]">{isLogin ? "Welcome back, Dev !" : "Create Your DevVerse Profile..."}</h2>
                {!isLogin && (
                    <>
                        <fieldset className="fieldset">
                            <legend className=" fieldset text-[#dde0f1]">Enter Your First Name</legend>
                            <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="input border-[#56629d]" placeholder="First Name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className=" fieldset text-[#dde0f1]">Enter Your Last Name</legend>
                            <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="input border-[#56629d]" placeholder="Last Name" />
                        </fieldset>
                    </>
                )}
                <fieldset className="fieldset">
                    <legend className=" fieldset text-[#dde0f1]">Enter Your Email ID</legend>
                    <input type="text" value={emailId} onChange={(e)=>setEmail(e.target.value)} className="input border-[#56629d]" placeholder="Email ID" />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className=" fieldset text-[#dde0f1]">Enter Your Password</legend>
                    <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} className="input border-[#56629d]" placeholder="Password" />
                </fieldset>
                <p className='text-red-800'>{error}</p>
                <div className="card-actions mt-3 flex justify-center ">
                    <button onClick={isLogin ? handleLogin : handleSignIn} className="btn bg-[#56629d] border border-1 text-white border-gray-700 shadow-sm shadow-gray-600 hover:border-slate-300 hover:bg-[#4b558a] hover:text-white">
                        {isLogin ? "Login" : "Sign-Up"}
                    </button>
                </div>
                <p onClick={()=>setIsLogin((value) => !value)} className='text-xs -mb-2 text-gray-400 cursor-pointer hover:text-gray-300 max-w-32'>{isLogin ? "New User? Sign-UP!" : "Already a User? Login!"}</p>
            </div>
        </div>
    </div>
)
}

export default Login