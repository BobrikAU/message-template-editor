import { useState } from "react";
import { nanoid } from "nanoid";
import styles from "./index.module.css";
import { ButtonWithVariable, ButtonOfCondition } from "../../ui/button";
import Textarea from "../../ui/textarea";
import { IMessage } from "../messageData";

interface ITemplateEditorProps {
  arrVarNames: string[];
  template: IMessage | null;
}

const TemplateEditor = ({ arrVarNames, template }: ITemplateEditorProps) => {
  // состояние с данными о шаблоне
  const [currentTemplate, setCcurrentTemplate] = useState<IMessage>({
    beginning: {
      value: "",
      if: null,
      next: null,
    },
  });
  const [ordinal, setOrdinal] = useState(1);

  // формирование кнопок с переменными
  const buttonsWithVariables = arrVarNames.map((item) => (
    <ButtonWithVariable text={item} onClick={() => {}} key={nanoid()} />
  ));

  const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const nameTextarea = e.currentTarget.name;
    const newCcurrentTemplate = structuredClone(currentTemplate);
    newCcurrentTemplate[nameTextarea].value = e.currentTarget.value;
    setCcurrentTemplate(newCcurrentTemplate);
    //console.log(newCcurrentTemplate);
  };

  const makeTemplateMarkup = () => {
    if (template === null) {
      return (
        <Textarea
          name={"beginning"}
          value={currentTemplate.beginning.value}
          changeHandler={handleChangeTextarea}
        />
      );
    }
    return <></>;
  };

  return (
    <section>
      <h1 className={styles.head}>Message Template Editor</h1>
      <div className={styles.buttonsContainer}>{buttonsWithVariables}</div>
      <ButtonOfCondition
        onClick={() => {}}
        externalStyles={styles.buttonCondition}
      />
      <div className={styles.tamplate}>{makeTemplateMarkup()}</div>
    </section>
  );
};

export default TemplateEditor;
