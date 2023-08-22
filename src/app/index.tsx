import styles from "./index.module.css";
import { ButtonDelete } from "../ui/button";
import Icon from "../ui/icons";
import Span from "../ui/span";

function App() {
  console.log(styles.aaa);
  return (
    <div className="App">
      <h1>Новое приложение</h1>
      <Span text="IF" />
      <ButtonDelete onClick={() => {}} />
    </div>
  );
}

export default App;
