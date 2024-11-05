import { useState } from "react";
import HybridForm from "./components/HybridForm";

function App() {
  const [render, setRender] = useState(0);

  console.log(`App rendered ${render}`);

  return (
    <main className="app">
      <HybridForm />
      <div
        style={{
          top: "1rem",
          right: "1rem",
          position: "absolute",
        }}
      >
        <button
          style={{
            color: "black",
            padding: ".5rem",
            fontSize: ".75em",
            backgroundColor: "red",
          }}
          onClick={() => setRender((prev) => prev + 1)}
        >
          Render
        </button>
      </div>
    </main>
  );
}

export default App;
