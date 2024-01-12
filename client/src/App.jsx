import "./App.css";
import Form from "./component/form/Form";
import background from "../public/assets/bg.jpg";

function App() {
  return (
    <div
      className="container"
      // style={{ backgroundImage: `url(${background})` }}
    >
      <Form />
    </div>
  );
}

export default App;
