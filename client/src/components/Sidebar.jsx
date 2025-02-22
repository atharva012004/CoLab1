import React, { useRef } from "react";
import { Socket } from "socket.io-client";

const Sidebar = ({ users, user, socket }) => {
  const sideBarRef = useRef(null);

  const openSideBar = () => {
    sideBarRef.current.style.left = "0";
  };

  const closeSideBar = () => {
    sideBarRef.current.style.left = "-100%";
  };

  return (
    <>
      <button
        className="btn btn-primary btn-sm"
        onClick={openSideBar}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: "1000",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
        }}
      >
        👥
      </button>
      <div
        className="position-fixed pt-2 h-100 bg-dark"
        ref={sideBarRef}
        style={{
          width: "250px",
          left: "-100%",
          transition: "0.3s ease-in-out",
          zIndex: "9999",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <button
          className="btn btn-block border-0 form-control rounded-0 btn-light"
          onClick={closeSideBar}
          style={{
            backgroundColor: "#ff4757",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ff6b81")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4757")}
        >
          Close
        </button>
        <div className="w-100 mt-5">
          <h4
            className="text-white text-center mb-4"
            style={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Online Users
          </h4>
          {users.map((usr, index) => (
            <div
              key={index}
              className="text-white text-center py-2"
              style={{
                backgroundColor: usr.id === socket.id ? "#2ed573" : "#3742fa",
                margin: "10px",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              {usr.username}
              {usr.id === socket.id && " - (You)"}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;