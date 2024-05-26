import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Nav from './components/Navigation/Nav'
import SignIn from './pages/account/SignIn'
import AboutUs from './pages/about/AboutUs'
import Services from './pages/services/Services'
import Contact from './pages/contact/Contact'
import SignUp from './pages/account/SignUp'
import Dashboard from './pages/dashboard/Dashboard'
import './index.css'
import Profile from './pages/profile/Profile'

function App() {

  return (
    <>
      <BrowserRouter>

        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
