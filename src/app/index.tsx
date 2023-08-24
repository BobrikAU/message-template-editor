import styles from "./index.module.css";
import { ControlButton } from "../ui/button";
import Span from "../ui/span";
import Textarea from "../ui/textarea";

function App() {
  return (
    <div className="App">
      <h1>Новое приложение</h1>
      <Span text="IF" />
      <ControlButton onClick={() => {}} text="Save" />
      <Textarea changeHandler={() => {}} value="" name="0_1_3" />
    </div>
  );
}

export default App;
