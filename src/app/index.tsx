import styles from "./index.module.css";
import TemplateEditor from "../components/templateEditor";
import Condition from "../components/condition";

function App() {
  const arrVarNames = localStorage.arrVarNames
    ? JSON.parse(localStorage.arrVarNames)
    : ["firstname", "lastname", "company", "position"];
  return (
    <div className="App">
      <TemplateEditor arrVarNames={arrVarNames} />
    </div>
  );
}

export default App;
