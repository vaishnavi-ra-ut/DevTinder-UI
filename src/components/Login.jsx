import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../utils/constants';

const Login = () => {
    
    const [emailId, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async() => {
        
        try{
            console.log("Login button clicked");
            const res = await axios.post(BaseURL + "/login" , {
                emailId , password
            } , { withCredentials: true })
             console.log("Login success:", res.data); 
             dispatch(addUser(res.data));

             return navigate("/");

        }catch(error) {
            setError(error?.response?.data);
            console.error("Login failed:", error);
            
        }
    }

return (
    <div>
        <div className="card bg-base-200 w-96 shadow-sm item-center mx-auto mt-10 border border-1 border-[#56629d] ">
            <div className="card-body">
                <h2 className="card-title flex justify-center text-lg]">Welcome back, Dev !</h2>
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
                    <button onClick={handleLogin} className="btn bg-[#56629d] border border-1 text-white border-gray-700 shadow-sm shadow-gray-600 hover:border-slate-300 hover:bg-[#4b558a] hover:text-white">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
)
}

export default Login