import { nanoid } from "nanoid";
import styles from "./index.module.css";
import { ButtonWithVariable, ButtonOfCondition } from "../../ui/button";
import Textarea from "../../ui/textarea";

interface ITemplateEditorProps {
  arrVarNames: string[];
}

const TemplateEditor = ({ arrVarNames }: ITemplateEditorProps) => {
  const buttonsWithVariables = arrVarNames.map((item) => (
    <ButtonWithVariable text={item} onClick={() => {}} key={nanoid()} />
  ));
  return (
    <section>
      <h1 className={styles.head}>Message Template Editor</h1>
      <div className={styles.buttonsContainer}>{buttonsWithVariables}</div>
      <ButtonOfCondition
        onClick={() => {}}
        externalStyles={styles.buttonCondition}
      />
      <div className={styles.tamplate}>
        <Textarea name="1" value="" changeHandler={() => {}} />
      </div>
    </section>
  );
};

export default TemplateEditor;
