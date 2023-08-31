import { useState, MouseEvent } from "react";
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
  const updateCurrentTemplate = (nameTextarea: string, newValue: string) => {
    const newCcurrentTemplate = structuredClone(currentTemplate);
    newCcurrentTemplate[nameTextarea].value = newValue;
    setCcurrentTemplate(newCcurrentTemplate);
    console.log(newCcurrentTemplate);
  };

  // счетчик для установления уникальных имен для текстовых полей
  const [ordinal, setOrdinal] = useState(1);

  // добавление переменных при нажатии на кнопку
  const handleDownButtonWithVariable = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const elementWithFocus = document.activeElement;
    const textButton = e.currentTarget.textContent;
    if (textButton) {
      if (elementWithFocus && elementWithFocus.tagName === "TEXTAREA") {
        const textareatWithFocus =
          document.activeElement as HTMLTextAreaElement;
        const start = textareatWithFocus.selectionStart;
        const end = textareatWithFocus.selectionEnd;
        setTimeout(() => {
          textareatWithFocus.focus();
          textareatWithFocus.setRangeText(textButton, start, end, "end");
          updateCurrentTemplate(
            textareatWithFocus.name,
            textareatWithFocus.value
          );
        });
      } else if (
        elementWithFocus === null ||
        elementWithFocus.tagName !== "TEXTAREA"
      ) {
        const firstTextarea = document.querySelector("textarea");
        if (firstTextarea) {
          firstTextarea.setRangeText(textButton, 0, 0, "end");
          updateCurrentTemplate(firstTextarea.name, firstTextarea.value);
        }
      }
    }
  };

  // формирование кнопок с переменными
  const buttonsWithVariables = arrVarNames.map((item) => (
    <ButtonWithVariable
      text={`{${item}}`}
      onMouseDown={handleDownButtonWithVariable}
      key={nanoid()}
    />
  ));

  const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const nameTextarea = e.currentTarget.name;
    updateCurrentTemplate(nameTextarea, e.currentTarget.value);
  };

  // формирование редактора сообщения
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
