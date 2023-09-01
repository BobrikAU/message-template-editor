import { useState, MouseEvent, useRef } from "react";
import { nanoid } from "nanoid";
import styles from "./index.module.css";
import { ButtonWithVariable, ButtonOfCondition } from "../../ui/button";
import Textarea from "../../ui/textarea";
import { IMessage, IString } from "../messageData";
import Span from "../../ui/span";
import { ButtonDelete } from "../../ui/button";

interface ITemplateEditorProps {
  arrVarNames: string[];
  template: IMessage | null;
}

const TemplateEditor = ({ arrVarNames, template }: ITemplateEditorProps) => {
  // состояние с данными о шаблоне
  const [currentTemplate, setCcurrentTemplate] = useState<IMessage>(
    template
      ? template
      : {
          beginning: {
            value: "bbb",
            if: ["1", "2", "3"],
            next: "4",
          },
          "1": {
            value: "111",
            if: null,
            next: null,
          },
          "2": {
            value: "222",
            if: ["5", "6", "7"],
            next: "8",
          },
          "3": {
            value: "333",
            if: null,
            next: null,
          },
          "4": {
            value: "444",
            if: null,
            next: null,
          },
          "5": {
            value: "555",
            if: null,
            next: null,
          },
          "6": {
            value: "666",
            if: null,
            next: null,
          },
          "7": {
            value: "777",
            if: ["9", "10", "11"],
            next: "12",
          },
          "8": {
            value: "888",
            if: null,
            next: null,
          },
          "9": {
            value: "999",
            if: null,
            next: null,
          },
          "10": {
            value: "101010",
            if: null,
            next: null,
          },
          "11": {
            value: "111111",
            if: null,
            next: null,
          },
          "12": {
            value: "121212",
            if: null,
            next: null,
          },
        }
  );
  // обновление данных при изменении содержания тестовых полей
  const updateCurrentTemplateValue = (
    nameTextarea: string,
    newValue: string
  ) => {
    const newCcurrentTemplate = structuredClone(currentTemplate);
    newCcurrentTemplate[nameTextarea].value = newValue;
    setCcurrentTemplate(newCcurrentTemplate);
    // console.log(newCcurrentTemplate);
  };

  // счетчик для установления уникальных имен для текстовых полей
  const refOrdinal = useRef(0);
  const getNewName = () => {
    refOrdinal.current += refOrdinal.current;
    return refOrdinal.current;
  };

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
          updateCurrentTemplateValue(
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
          updateCurrentTemplateValue(firstTextarea.name, firstTextarea.value);
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
    updateCurrentTemplateValue(nameTextarea, e.currentTarget.value);
  };

  // формирование редактора сообщения
  const makeTemplateMarkup = (dataName: string) => {
    const condition = currentTemplate[dataName].if;
    const [nameIf, nameThen, nameElse] = condition
      ? condition
      : [null, null, null];
    const nameNext = currentTemplate[dataName].next;
    const templateMarkup: JSX.Element = (
      <div className={styles.templateMarkup}>
        <Textarea
          name={dataName}
          value={currentTemplate[dataName].value}
          changeHandler={handleChangeTextarea}
        />
        {currentTemplate[dataName].if && (
          <div className={styles.container}>
            {/*часть, вычисляющая булевый результат условия, с текстом или блоком IF-THEN-ELSE*/}
            <div className={styles.conditionLabel}>
              <Span text="IF" externalStyles={styles.condition} />
              <ButtonDelete onClick={() => {}} />
            </div>
            <div className={styles.conditionText}>
              {makeTemplateMarkup(nameIf ? nameIf : "")}
            </div>
            {/*часть, активная при вычислении в условии true, с текстом или блоком IF-THEN-ELSE*/}
            <div className={styles.conditionLabel}>
              <Span text="THEN" externalStyles={styles.then} />
            </div>
            <div className={styles.conditionText}>
              {makeTemplateMarkup(nameThen ? nameThen : "")}
            </div>
            {/*часть, активная при вычислении в условии false, с текстом или блоком IF-THEN-ELSE*/}
            <div className={styles.conditionLabel}>
              <Span text="ELSE" externalStyles={styles.else} />
            </div>
            <div className={styles.conditionText}>
              {makeTemplateMarkup(nameElse ? nameElse : "")}
            </div>
          </div>
        )}
        {nameNext && makeTemplateMarkup(nameNext)}
      </div>
    );
    return templateMarkup;
  };

  // const handleClickButtonOfCondition = () => {
  //   const elementWithFocus = document.activeElement;
  //   if (elementWithFocus && elementWithFocus.tagName === "TEXTAREA") {
  //     const textareatWithFocus = document.activeElement as HTMLTextAreaElement;
  //     const nameOfTextareatWithFocus = textareatWithFocus.name;
  //     const dataOfTextareatWithFocus = currentTemplate[nameOfTextareatWithFocus];
  //     const newDataOfTextareatWithFocus: IString = {
  //       value: '',
  //       if: [String(getNewName()), String(getNewName()), String(getNewName())],
  //       next: String(getNewName()),
  //     };
  //   }
  // };

  return (
    <section>
      <h1 className={styles.head}>Message Template Editor</h1>
      <div className={styles.buttonsContainer}>{buttonsWithVariables}</div>
      <ButtonOfCondition
        onMouseDown={() => {}}
        externalStyles={styles.buttonCondition}
      />
      <div className={styles.tamplate}>{makeTemplateMarkup("beginning")}</div>
    </section>
  );
};

export default TemplateEditor;
