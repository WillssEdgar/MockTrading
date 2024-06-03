import { useLocation, useNavigate } from "react-router-dom"
import logo from '../../assets/leafLogo.svg'
import userLogo from '../../assets/user.svg'
import { useState } from "react";


function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const email = location.state ? location.state.email : null;
  const currentPath = location.pathname;
  console.log("Current Path: ", currentPath)


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log(isDropdownOpen)
  };
  const logout = () => {
    navigate("/", {})
  }

  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <a className="text-3xl font-bold leading-none" href="#">
          <img src={logo} alt="logo" className="h-16" />
        </a>
        <div className="flex lg:hidden">
          <button className="navbar-burger flex items-center text-blue-600 p-3">
            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex lg:items-center lg:space-x-6 ml-auto">
          <li><a className={`text-sm font-bold ${currentPath === '/' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-500'}`} href="/">Home</a></li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li><a className={`text-sm ${currentPath === '/AboutUs' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-500'}`} href="/AboutUs">About Us</a></li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li><a className={`text-sm ${currentPath === '/Services' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-500'}`} href="/Services">Services</a></li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li><a className={`text-sm ${currentPath === '/Contact' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-500'}`} href="/Contact">Contact</a></li>
          {email && (
            <div className="relative">
              <button onClick={toggleDropdown} className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                <img src={userLogo} alt="User" className="w-full h-full object-cover" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-20">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <a onClick={() => { navigate("/Dashboard", { state: { email: email } }) }} className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                    </li>
                    <li>
                      <a onClick={() => { navigate("/Profile", { state: { email: email } }) }} className="block px-4 py-2 hover:bg-gray-100">Profile</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                    </li>
                    <li>
                      <a onClick={logout} className="block px-4 py-2 hover:bg-gray-100">Sign out</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Nav
