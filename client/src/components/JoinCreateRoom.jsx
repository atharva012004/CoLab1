import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const JoinCreateRoom = ({ uuid, setUser, setRoomJoined }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name) return toast.dark("Please enter your name!");

    setUser({
      roomId,
      userId: uuid(),
      userName: name,
      host: true,
      presenter: true,
    });
    setRoomJoined(true);
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinName) return toast.dark("Please enter your name!");

    setUser({
      roomId: joinRoomId,
      userId: uuid(),
      userName: joinName,
      host: false,
      presenter: false,
    });
    setRoomJoined(true);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center my-5 display-4 font-weight-bold text-primary">
            🎨 Whiteboard by CoLAB
          </h1>
        </div>
      </div>
      <div className="row mx-5 mt-5">
        <div className="col-md-5 p-5 border mx-auto rounded-lg shadow-lg bg-light">
          <h1 className="text-center text-primary mb-5">🚀 Create Room</h1>
          <form onSubmit={handleCreateSubmit}>
            <div className="form-group my-2">
              <input
                type="text"
                placeholder="Enter your name"
                className="form-control form-control-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #ced4da",
                  padding: "10px",
                }}
              />
            </div>
            <div className="input-group my-2 border align-items-center rounded-lg">
              <input
                type="text"
                className="form-control border-0 outline-0"
                value={roomId}
                readOnly={true}
                style={{
                  boxShadow: "none",
                  fontSize: "0.89rem",
                  padding: "10px",
                }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-primary border-0 btn-sm"
                  type="button"
                  onClick={() => setRoomId(uuid())}
                  style={{
                    borderRadius: "10px",
                    marginRight: "5px",
                  }}
                >
                  🔄 Generate
                </button>
                <CopyToClipboard
                  text={roomId}
                  onCopy={() => toast.success("Room Id Copied To Clipboard!")}
                >
                  <button
                    className="btn btn-outline-dark border-0 btn-sm"
                    type="button"
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    📋 Copy
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            <div className="form-group mt-5">
              <button
                type="submit"
                className="form-control btn btn-primary btn-lg"
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  fontSize: "1.2rem",
                }}
              >
                🛠️ Create Room
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-5 p-5 border mx-auto rounded-lg shadow-lg bg-light">
          <h1 className="text-center text-primary mb-5">🔗 Join Room</h1>
          <form onSubmit={handleJoinSubmit}>
            <div className="form-group my-2">
              <input
                type="text"
                placeholder="Enter your name"
                className="form-control form-control-lg"
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #ced4da",
                  padding: "10px",
                }}
              />
            </div>
            <div className="form-group my-2">
              <input
                type="text"
                className="form-control form-control-lg outline-0"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
                placeholder="Enter Room Id"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #ced4da",
                  padding: "10px",
                }}
              />
            </div>
            <div className="form-group mt-5">
              <button
                type="submit"
                className="form-control btn btn-success btn-lg"
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  fontSize: "1.2rem",
                }}
              >
                🚪 Join Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateRoom;