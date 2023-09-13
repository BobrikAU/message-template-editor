import { useState } from "react";
import styles from "./index.module.css";
import TemplateEditor from "../components/templateEditor";
import { IMessage } from "../components/messageData";
import { OpenEditorButton } from "../ui/button";

function App() {
  const [step, setStep] = useState(1);
  const [isOpenEditorButtonVisiebel, setIsOpenEditorButtonVisiebel] =
    useState(true);
  const [isTemplateEditorVisible, setIsTemplateEditorVisible] = useState(false);
  const arrVarNames: string[] = localStorage.arrVarNames
    ? JSON.parse(localStorage.arrVarNames)
    : ["firstname", "lastname", "company", "position"];
  const template: IMessage | null = localStorage.template
    ? JSON.parse(localStorage.template)
    : null;
  const callbackSave = (currentTemplate: IMessage) => {
    localStorage.template = JSON.stringify(currentTemplate);
  };
  const handleClickOpenEditorButton = () => {
    setIsOpenEditorButtonVisiebel(false);
    setTimeout(() => {
      setStep(2);
      setTimeout(() => setIsTemplateEditorVisible(true));
    }, 300);
  };

  return (
    <main className={styles.app}>
      {step === 1 ? (
        <OpenEditorButton
          onClick={handleClickOpenEditorButton}
          externalStyles={`${styles.openEditorButton} ${
            !isOpenEditorButtonVisiebel && styles.openEditorButtonHidden
          }`}
        />
      ) : (
        <TemplateEditor
          arrVarNames={arrVarNames}
          template={template}
          setStep={setStep}
          callbackSave={callbackSave}
          setIsOpenEditorButtonVisiebel={setIsOpenEditorButtonVisiebel}
          isTemplateEditorVisible={isTemplateEditorVisible}
          setIsTemplateEditorVisible={setIsTemplateEditorVisible}
        />
      )}
    </main>
  );
}

export default App;
