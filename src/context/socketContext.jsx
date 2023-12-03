import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

// const getSocket = () => {
//   return io(import.meta.env.VITE_APP_SOCKET_URI, {
//     withCredentials: true,
//   });
// };

const SocketContext = createContext();

const useSocket = () => {
  return useContext(SocketContext);
}

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user,token } = useSelector(state => state.auth);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_APP_SOCKET_URI, {
      withCredentials: true,
      query: {
        access_token:token,
      },
    });
    setSocket(socket);
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });
    return () => {
      socket && socket.close();
    }
  }, [user]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
