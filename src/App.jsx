import { useState } from "react";
import HybridForm from "./components/HybridForm";
import ControlledForm from "./components/comparison/ControlledForm";
import UncontrolledForm from "./components/comparison/UnControlledForm";

function App() {
  const [render, setRender] = useState(0);

  console.log(`App rendered ${render}`);

  return (
    <main className="app">
      {/* <UncontrolledForm /> */}
      {/* <ControlledForm /> */}
      {Array.from({ length: 100 }).map((_, i) => (
        <UncontrolledForm key={i} />
      ))}

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
