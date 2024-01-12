import "./createroom.css";

const CreateRoom = () => {
  return (
    <form className="form mt-5 col-md-12 uppercase">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter you Name"
        />
      </div>

      <div className="input-group d-flex align-item-center justify-content-center">
        <input
          type="text"
          className="form-control my-2 border-0"
          placeholder="Generate room code"
        />

        <div className="input-group d-flex justify-content-between mt-2">
          <button type="button" className="btn border btn-sm generate">
            Generate
          </button>
          <button type="button" className="btn border btn-sm copy">
            Copy
          </button>
        </div>
        <button type="submit" className="btn border btn-sm w-100 mt-2 room">
          Generate Room
        </button>
      </div>
    </form>
  );
};

export default CreateRoom;
