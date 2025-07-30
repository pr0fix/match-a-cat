import "./App.css";
import CardStack from "./components/CardStack";
import useArrowKeys from "./hooks/useArrowKeys";

function App() {
  useArrowKeys();

  return (
    <>
      <CardStack />
    </>
  );
}

export default App;
