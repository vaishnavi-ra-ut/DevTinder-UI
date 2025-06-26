import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BaseURL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import Connections from './Connections';

const Navbar = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch(); 
  const Navigate = useNavigate();

  const handleLogout = async() => {
    try{
      await axios.post(BaseURL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser()); 
      return Navigate("/login");
    }catch(err){
      console.error("Error logging out:", err.message);
    }
  }

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm sticky top-0 z-10"> 
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-2xl text-[#ced4f5]">
            <img alt="DevVerse Logo" className="h-[3.7rem] w-52 mt-1" src= "https://i.postimg.cc/Qd6ZzVxp/Screenshot-2025-06-26-123512.png" />
          </Link>
        </div>
        {user && (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end mx-5">
              <div className="flex items-center">
                <p className='font-semibold text-lg'>Hey👋, {user.firstName}</p>
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 px-3 py-2 rounded-md"
                >
                  <div className="w-9 h-9 rounded-full  overflow-hidden">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.photoURL}
                      className='w-full h-full object-cover'
                    />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile 
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requets Received</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        )}
      </div>
    </>
  )
}

export default Navbar