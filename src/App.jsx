import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatLayout from './pages/ChatLayout';
import LoginForm from './pages/LoginForm';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Redurect from './hooks/Redurect';


const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="h-screen w-screen overflow-hidden">
          <Routes>
            <Route path="/" element={user ? <ChatLayout /> : <LoginForm />} />
            <Route path="*" element={<Redurect />} />
          </Routes>
      <ToastContainer />
    </div>
  );
};



export default App;
