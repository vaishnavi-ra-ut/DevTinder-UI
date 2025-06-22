import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest , removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(store => store.requests);

  const reviewRequest = async (status , _id) => {
    try{
      const res = axios.post(BaseURL + "/request/review/" + status + "/" + _id , {} , {withCredentials : true})
      dispatch(removeRequest(_id))
    }catch(err){
      console.log(err);
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BaseURL + "/user/pendingRequests", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
      console.log("Response from server", res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="text-2xl font-bold flex justify-center mt-10 text-[#ced4f5]">
        No Requests Found
      </h1>
    );

  return (
    <>
      <div className="text-center my-10 ">
        <h1 className="font-bold text-2xl text-[#ced4f5]">Your Requests</h1>
        {requests.map((request) => {
          console.log("photoURL:", request.fromOurUserId.photoURL);

  const {
    firstName,
    lastName,
    about,
    skills,
    photoURL,
    age,
    gender,
  } = request.fromOurUserId;

          return (
            <div
              key={request._id}
              className="flex items-center pl-4 rounded-lg shadow-md w-[25rem] max-w-xl min-h-[7.6rem] mx-auto mt-4 py-2 px-1 bg-base-200 border border-[#292727] justify-evenly"
            >
              <img
                src={photoURL}
                alt={`${firstName}'s photo`}
                className="w-20 h-20 rounded-full object-cover mr-5"
              />
              <div className="flex flex-col text-left">
                <h2 className="text-md font-semibold">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm mt-1">{about}</p>
                <p className="text-sm mt-1 text-slate-500">{age}, {gender}</p>
                <div className="mt-2 flex">
                  <h6 className="text-sm">Skills :</h6>
                  <p className="text-sm ml-1">
                    {Array.isArray(skills)
                      ? skills.map((skill, index) => (
                          <span key={index}>{skill} </span>
                        ))
                      : skills}
                  </p>
                </div>
              </div>
              <div className="flex ml-2 mr-2 gap-x-2">
                <button onClick={() => reviewRequest("accepted" , request._id)} className="btn btn-outline btn-info">✓</button>
                <button onClick={() => reviewRequest("interested" , request._id)} className="btn btn-outline btn-error">✗</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Requests;
