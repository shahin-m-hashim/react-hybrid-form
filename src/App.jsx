import { useState } from "react";
import Form from "./components/Form";

function App() {
  const [render, setRender] = useState(0);

  console.log(`App rendered ${render}`);

  return (
    <main className="app">
      <Form />
      <button
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          width: "5rem",
          color: "black",
          backgroundColor: "red",
        }}
        onClick={() => setRender((prev) => prev + 1)}
      >
        Render
      </button>
    </main>
  );
}

export default App;
