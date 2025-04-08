import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";
import ClientRoom from "./components/ClientRoom";
import JoinCreateRoom from "./components/JoinCreateRoom";
import Room from "./components/Room";
import Sidebar from "./components/Sidebar";
// import "./style.css";
import Footer from "./components/footer/Footer";
import Home from './components/TopPage/Home.jsx';
import Login from './components/TopPage/Login.jsx';
import Signup from './components/TopPage/Signup.jsx';
import Navbar from './components/TopPage/Navbar.jsx';

const server = "http://localhost:5000";

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

const App = () => {
  const [userNo, setUserNo] = useState(0);
  const [roomJoined, setRoomJoined] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  useEffect(() => {
    if (roomJoined) {
      socket.emit("user-joined", user);
    }
  }, [roomJoined]);

  return (
    <Router> {/* Wrap the whole app in Router */}
      <ToastContainer />
      <Navbar/>
      <Routes>
        {/* Define routes for the top pages (Home, Login, Signup) */}
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/signup" element={<Signup />} /> {/* Signup page */}
        <Route path="/try-it" element={
    <div className="home">
      <ToastContainer />
      {roomJoined ? (
        <>
          <Sidebar users={users} user={user} socket={socket} />
          {user.presenter ? (
            <Room
              userNo={userNo}
              user={user}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
          ) : (
            <ClientRoom
              userNo={userNo}
              user={user}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
          )}
        </>
      ) : (
        <JoinCreateRoom
          uuid={uuid}
          setRoomJoined={setRoomJoined}
          setUser={setUser}
        />
      )}

      <Footer />
    </div>
    } />
    </Routes>
  </Router>
  );
};
export default App;
