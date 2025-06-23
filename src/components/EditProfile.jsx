import { useState } from "react";
import UserCard from "./UserCard"
import { BaseURL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({user}) => {
    const [photoURL , setPhotoURL] = useState(user?.photoURL || "");
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || "");
    const [about, setAbout] = useState(user?.about || "");
    const [skills, setSkills] = useState(user?.skills || "");
    const [gender , setGender] = useState(user?.gender || "");
    const [error , setError] = useState("");
    const [toast , setToast] = useState(false);

    const dispatch = useDispatch();
  

    const saveProfile = async() => {
        try{
            const res = await axios.patch(BaseURL+"/profile/edit", {
                firstName, lastName, age, gender, skills, about, photoURL
            }, {withCredentials : true});

            dispatch(addUser(res.data))
            setToast(true); 
            setTimeout(()=>{
                setToast(false)
            } , 3000);

        }catch (err) {
            setError(err?.response?.data || err.message || " ");
        }
    }

return (
    <>
        <div className="flex flex-col justify-center items-center mb-10">
            <h1 className="text-xl font-bold mt-5 text-[#ced4f5]">Patch Details</h1>
            <div className="flex justify-center gap-x-4 mt-5 ">
                <div className="card bg-base-200 w-96 shadow-sm item-center mx-auto  border border-1 border-[#56629d] ">
                <div className="card-body">
                    
                    <fieldset className="fieldset">
                        <legend className="fieldset text-[#dde0f1]">Enter Your Profile Pic URL</legend>
                        <input
                            type="text"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="input border-[#56629d]"
                            placeholder="Profile Pic URL"
                        />
                    </fieldset>
                   
                    <fieldset className="fieldset">
                        <legend className="fieldset text-[#dde0f1]">Enter Your First Name</legend>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="input border-[#56629d]"
                            placeholder="First Name"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset text-[#dde0f1]">Enter Your Last Name</legend>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input border-[#56629d]"
                            placeholder="Last Name"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset text-[#dde0f1]">Enter Your Age</legend>
                        <input
                            type="text"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="input border-[#56629d]"
                            placeholder="Age"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset text-[#dde0f1]">Tell About Yourself</legend>
                        <input
                            type="text"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="input border-[#56629d]"
                            placeholder="About You"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset text-[#dde0f1]">Enter Your Skills</legend>
                        <input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="input border-[#56629d]"
                            placeholder="Skills"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset text-[#dde0f1]">Enter Your Gender</legend>
                        <input
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="input border-[#56629d]"
                            placeholder="Gender"
                        />
                    </fieldset>
                    <p className="text-red-800">{error}</p>
                    <div className="card-actions mt-3 flex justify-center">
                        <button onClick={saveProfile} className="btn bg-[#56629d] border border-1 text-white border-gray-700 shadow-sm shadow-gray-600 hover:border-slate-300 hover:bg-[#4b558a] hover:text-white">
                            Update
                        </button>
                    </div>
                </div>
            </div>
                <UserCard user={{ firstName, lastName, age, gender, skills, about, photoURL }} />
            </div>
        </div>
        {toast && (<div className="toast toast-top toast-center mt-14 ">
            <div className="alert alert-success">
                <span>Profile patched successfully.</span>
            </div>
        </div>)}
    </>
)
}

export default EditProfile