import { useState } from "react";
import "./App.css";
import AR from "./components/AR";
function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleTakePhoto = (data) => {
    console.log("kkkk", data);
  };

  return (
    <div>
      {open && <AR handleTakePhoto={handleTakePhoto} />}
      <button onClick={handleOpen}>open</button>
    </div>
  );
}

export default App;
