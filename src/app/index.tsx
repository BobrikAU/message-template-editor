import { useState } from "react";
import styles from "./index.module.css";
import TemplateEditor from "../components/templateEditor";
import { IMessage } from "../components/messageData";

function App() {
  const [step, setStep] = useState(2);
  const arrVarNames: string[] = localStorage.arrVarNames
    ? JSON.parse(localStorage.arrVarNames)
    : ["firstname", "lastname", "company", "position"];
  const template: IMessage | null = localStorage.template
    ? JSON.parse(localStorage.template)
    : null;
  return (
    <div className="App">
      {step === 1 ? (
        <span>1</span>
      ) : step === 2 ? (
        <TemplateEditor arrVarNames={arrVarNames} template={template} />
      ) : (
        <span>3</span>
      )}
    </div>
  );
}

export default App;
