const JoinRoom = () => {
  return (
    <form className="form mt-5 h-75 col-md-12">
      <div className="form-group">
        <input
          type="text"
          className="border-0 form-control my-2"
          placeholder="Enter you Name"
        />
      </div>

      <div className="form-group mt-3">
        <input
          type="text"
          className="form-control my-2 border-0"
          placeholder="Enter room code"
        />
      </div>

      <button type="submit" className="mt-4 btn room btn-block form-control">
        Join Room
      </button>
    </form>
  );
};

export default JoinRoom;
