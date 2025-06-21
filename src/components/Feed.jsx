import axios from "axios"
import { BaseURL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if(feed) return;
    const res = await axios.get(BaseURL + '/user/feed' , {withCredentials: true});
    dispatch(addFeed(res.data.data));
    console.log(res.data.data);
  } 

  useEffect(() => {
    getFeed();  
  },  );

  return (
    feed && (
      <>
        <div className="flex justify-center flex-col items-center gap-y-3 mt-2">
           <h1 className="text-xl font-bold mt-2 text-[#ced4f5]">Deploy New Connections!</h1>
          <UserCard user = {feed[3]}  />
        </div>
    </>
    )
  )
}

export default Feed