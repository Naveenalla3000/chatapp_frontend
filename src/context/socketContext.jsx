import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const getSocket = () => {
  return io(import.meta.env.VITE_APP_SOCKET_URI, {
    withCredentials: true,
  });
};

const SocketContext = createContext({
  socket: null,
});

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(getSocket());
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export {SocketProvider,useSocket};
