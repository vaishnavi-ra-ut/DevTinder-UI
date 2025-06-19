import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const user = useSelector((store) => store.user);

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm"> 
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-2xl">DevVerse</Link>
        </div>
        {user && (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end mx-5">
              <div className="flex items-center">
                <p>Welcome {user.firstName} !</p>
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
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