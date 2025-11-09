import './App.css' // optional, can be empty — main styles live in index.css
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
// import Contact from './pages/Contact'
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="site-main">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Routed path="/contact" element={<Contact />} /> */}

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
