import { useState } from "react";

const App = () => {
  const History = (props) => {
    return props.allClicks.length === 0 ? (
      <div>the app is used by pressing the buttons</div>
    ) : (
      <div>button press history: {props.allClicks.join(" ")}</div>
    );
  };

  const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRight = right + 1;
    setRight(updatedRight);
  };

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text="left" />
      <Button onClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
