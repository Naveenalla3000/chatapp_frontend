import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatLayout from "./pages/ChatLayout";
import LoginForm from "./pages/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Redirect from "./hooks/Redirect";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Routes>
        <Route path="/" element={user ? <ChatLayout /> : <LoginForm />} />
        <Route path="*" element={<Redirect />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
