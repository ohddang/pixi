import "./App.css";

import DrawingBoard from "./board/DrawingBoard";
import SampleBoard from "./board/SampleBoard";

const App = () => {
  return (
    <>
      <h1>React PixiJS 5</h1>
      <div className="board-layout">
        <SampleBoard />
        <DrawingBoard />
      </div>
    </>
  );
};

export default App;
