import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/HeroSection";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContactPage from "./pages/ContactPage";
import RoomList from "./pages/RoomList";
import RoomDetail from "./pages/RoomDetail";
import Services from "./pages/services";
import Home from "./components/Home";
import { Toaster } from 'react-hot-toast';
import MyPost from "./pages/MyPost";
import CreatePost from "./pages/CreatePost";

const App = () => {
  return (
    <div>
      <Toaster /> 
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/rooms" element={<RoomList />} />
        {/* Correct the route path to match the frontend route */}
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path='/myposts' element={<MyPost/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Services />
      <Home />
    </div>
  );
};

export default App;
