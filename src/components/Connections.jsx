import axios from 'axios';
import { useEffect } from 'react'
import { BaseURL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {addConnection} from '../utils/connectionSlice'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BaseURL + "/user/connections", { withCredentials: true });
            dispatch(addConnection(res.data.data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;
    if (connections.length === 0)
        return (
            <h1 className="flex justify-center text-2xl font-bold mt-14 text-[#ced4f5]">
                No Connections Found
            </h1>
        );

    return (
        <>
            <div className="text-center my-10 ">
                <h1 className="font-bold text-2xl text-[#ced4f5]">Connections</h1>
                {connections.map((connection) => {
  const {
    firstName,
    lastName,
    about,
    skills,
    photoURL,
  } = connection.user;

  return (
    <div
      key={connection._id}
      className="flex items-center pl-4 rounded-lg shadow-md w-[25rem] max-w-xl min-h-[7.6rem] mx-auto my-4 bg-base-200 border p-2 border-[#292727]"
    >
      {/* Photo on the left */}
      <img
        src={photoURL}
        alt={`${firstName}'s photo`}
        className="w-20 h-20 rounded-full object-cover mr-6"
      />

      {/* Details on the right */}
      <div className="flex flex-col text-left">
        <h2 className="text-md font-semibold">{firstName} {lastName}</h2>
        <p className="text-sm mt-1">{about}</p>
        <div className="mt-2 flex">
          <h6 className=" text-sm">Skills :</h6>
          <p className="text-sm ml-1">
            {skills?.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
})}

            </div>
        </>
    );
};

export default Connections