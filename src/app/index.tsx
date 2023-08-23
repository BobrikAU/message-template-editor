import styles from "./index.module.css";
import { ControlButton } from "../ui/button";
import Span from "../ui/span";

function App() {
  console.log(styles.aaa);
  return (
    <div className="App">
      <h1>Новое приложение</h1>
      <Span text="IF" />
      <ControlButton onClick={() => {}} text="Save" />
    </div>
  );
}

export default App;
