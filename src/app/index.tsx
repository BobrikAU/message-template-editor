import styles from "./index.module.css";
import TemplateEditor from "../components/templateEditor";
import { IMessage } from "../components/messageData";

function App() {
  const arrVarNames: string[] = localStorage.arrVarNames
    ? JSON.parse(localStorage.arrVarNames)
    : ["firstname", "lastname", "company", "position"];
  const template: IMessage | null = localStorage.template
    ? JSON.parse(localStorage.template)
    : null;
  return (
    <div className="App">
      <TemplateEditor arrVarNames={arrVarNames} template={template} />
    </div>
  );
}

export default App;
