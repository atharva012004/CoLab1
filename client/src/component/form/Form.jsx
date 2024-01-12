import React from "react";
import "./form.css";
import RoomIcon from "../../../public/assets/room.svg"; // Import your SVG file
import CreateRoom from "./createroom/CreateRoom";
import JoinRoom from "./joinroom/JoinRoom";

const Form = () => {
  return (
    <div className="form-container">
      <div className="form-box">
        <img src={RoomIcon} alt="Room" className="form-icon" />
        <h1>Create Room</h1>
        <CreateRoom />
      </div>

      <div className="form-box">
        <img src={RoomIcon} alt="Room" className="form-icon" />
        <h1>Join Now</h1>
        <JoinRoom />
      </div>
    </div>
  );
};

export default Form;
