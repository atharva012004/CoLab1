import React, { useRef } from "react";
import { Socket } from "socket.io-client";

const Sidebar = ({ users, user, socket }) => {
  // This useRef hook is used to store a reference to the sidebar DOM element.
  const sideBarRef = useRef(null);

  const openSideBar = () => {
    // This function is triggered when the "Users" button is clicked.
    // It sets the left style property of the sidebar to 0, effectively sliding it into view.
    sideBarRef.current.style.left = 0;
  };

  const closeSideBar = () => {
    // This function is triggered when the "Close" button is clicked.
    // It sets the left style property of the sidebar to -100%, effectively sliding it out of view.
    sideBarRef.current.style.left = -100 + "%";
  };

  // The render method returns the JSX that should be rendered by this component.
  // It includes a "Users" button, a sidebar with a "Close" button, and a list of users.
  return (
    <>
      <button
        className="btn btn-dark btn-sm"
        onClick={openSideBar}
        style={{ position: "absolute", top: "5%", left: "5%" }}
      >
        Users
      </button>
      <div
        className="position-fixed pt-2 h-100 bg-dark"
        ref={sideBarRef}
        style={{
          width: "150px",
          left: "-100%",
          transition: "0.3s linear",
          zIndex: "9999",
        }}
      >
        <button
          className="btn btn-block border-0 form-control rounded-0 btn-light"
          onClick={closeSideBar}
        >
          Close
        </button>
        <div className="w-100 mt-5">
          {users.map((usr, index) => (
            <p key={index} className="text-white text-center py-2">
              {usr.username}
              {usr.id === socket.id && " - (You)"}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
