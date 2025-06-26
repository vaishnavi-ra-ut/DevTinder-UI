import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  // const getFeed = async () => {
  //   if (feed) return;
  //   try {
  //     const res = await axios.get(BaseURL + "/user/feed", {
  //       withCredentials: true,
  //     });
  //     dispatch(addFeed(res.data.data));
  //   } catch (err) {
  //     console.error("Error fetching feed:", err.message);
  //   }
  // };

  useEffect(() => {
    const fetchFeed = async () => {
      if (feed) return;
      try {
        const res = await axios.get(BaseURL + "/user/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.data));
      } catch (err) {
        console.error("Error fetching feed:", err.message);
      }
    };
    fetchFeed();
  }, [dispatch, feed]);

  return (
    <div className="flex justify-center flex-col items-center gap-y-3 mt-2">
      {!feed || feed?.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 mt-36">
          <p className="mt-4 text-lg font-semibold">No people to suggest right now</p>
        </div>
      ) : (
        <>
          <h1 className="text-xl font-bold mt-2 text-[#ced4f5]">
            Deploy New Connections!
          </h1>
          <UserCard user={feed[0]} />
        </>
      )}
    </div>
  );
};

export default Feed;
