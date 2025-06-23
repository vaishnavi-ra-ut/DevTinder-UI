import axios from "axios";
import { BaseURL } from './../utils/constants';
import { useDispatch } from "react-redux";
import {removeUserFromFeed} from "../utils/feedSlice"

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  if (!user) return null;
  const handleSendRequest = async(status , id)=>{
    try{
      const res = await axios.post(BaseURL + "/request/send/" + status + "/" + id , {} , {withCredentials:true})
      dispatch(removeUserFromFeed(id))

    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
    <div className="flex flex-col items-center ">
       
    <div className="card bg-base-300 w-[18rem] shadow-sm border border-1 border-[#303136] rounded-[1.7rem]">
      <figure className="px-5 pt-6 ">
        <img
          src={user.photoURL}
          alt="Profile"
          className="rounded-[1.3rem] h-[15rem]"
        />
      </figure>
      <div className="card-body items-center text-center -mt-4 ">
            <h2 className="card-title">{user.firstName} {user.lastName}</h2>
            {user.age && user.gender && (
              <p className="-mt-1">{user.age} years old • {user.gender}</p>
            )}
            {user.skills && (<p className="-mt-1">{user.skills}</p>)}
            <p className="-mt-2 mb-2">{user.about || "No about info provided."}</p>
            <div className="card-actions">
                <button  onClick={() => handleSendRequest("ignored", user._id)} className="btn text-white bg-[#48517e] -mb-1 w-[5.4rem] rounded-md">Ignore</button>
                <button onClick={() => handleSendRequest("interested", user._id)} className="btn text-white bg-[#b83d81] -mb-1 rounded-md">Connect</button>
            </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default UserCard;