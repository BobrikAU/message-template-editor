import { useState } from "react";
import styles from "./index.module.css";
import TemplateEditor from "../components/templateEditor";
import { IMessage } from "../components/messageData";
import { OpenEditorButton } from "../ui/button";

function App() {
  const [step, setStep] = useState(1);
  const arrVarNames: string[] = localStorage.arrVarNames
    ? JSON.parse(localStorage.arrVarNames)
    : ["firstname", "lastname", "company", "position"];
  const template: IMessage | null = localStorage.template
    ? JSON.parse(localStorage.template)
    : null;
  const callbackSave = (currentTemplate: IMessage) => {
    localStorage.template = JSON.stringify(currentTemplate);
  };

  return (
    <main className={styles.app}>
      {step === 1 ? (
        <OpenEditorButton
          onClick={() => setStep(2)}
          externalStyles={styles.openEditorButton}
        />
      ) : (
        <TemplateEditor
          arrVarNames={arrVarNames}
          template={template}
          setStep={setStep}
          callbackSave={callbackSave}
        />
      )}
    </main>
  );
}

export default App;
