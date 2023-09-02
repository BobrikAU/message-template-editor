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
  const initialDataTextarea = {
    value: "",
    if: null,
    next: null,
  };
  // состояние с данными о шаблоне
  const [currentTemplate, setCcurrentTemplate] = useState<IMessage>(
    template
      ? template
      : {
          beginning: { ...initialDataTextarea },
        }
  );
  // обновление данных при изменении содержания тестовых полей
  const updateCurrentTemplateValue = (
    nameTextarea: string,
    newValue: string
  ) => {
    const newCcurrentTemplate = { ...currentTemplate };
    newCcurrentTemplate[nameTextarea].value = newValue;
    setCcurrentTemplate(newCcurrentTemplate);
  };

  // счетчик для установления уникальных имен для текстовых полей
  const refOrdinal = useRef(0);
  const getNewName = () => {
    refOrdinal.current++;
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

  // обновление значения текстовых полей при их редактировании
  const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    updateCurrentTemplateValue(e.currentTarget.name, e.currentTarget.value);
  };

  // формирование редактора сообщения
  const makeTemplateMarkup = (dataName: string) => {
    const condition = currentTemplate[dataName].if;
    const [nameIf, nameThen, nameElse] = condition
      ? condition
      : [null, null, null];
    const nameNext = currentTemplate[dataName].next;
    const templateMarkup: JSX.Element = (
      <>
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
      </>
    );
    return templateMarkup;
  };

  const handleClickButtonOfCondition = () => {
    const elementWithFocus = document.activeElement;
    if (elementWithFocus && elementWithFocus.tagName === "TEXTAREA") {
      // определяем текстовое поле, на котором будет условное ветвление, и его имя
      const textareaWithFocus = document.activeElement as HTMLTextAreaElement;
      const nameOfTextareaWithFocus = textareaWithFocus.name;
      // распределяем тескт по вновь создаваемым полям
      const selectionStart = textareaWithFocus.selectionStart;
      const topValue = textareaWithFocus.value.slice(0, selectionStart);
      const bottomValue = textareaWithFocus.value.slice(selectionStart);
      // определяем имена новых полей
      const nameIf = String(getNewName());
      const nameThen = String(getNewName());
      const nameElse = String(getNewName());
      const nameNext = String(getNewName());
      // формирование данных о верхней и нижнем текстовых полях
      const dataOfTopTextarea: IString = {
        value: topValue,
        if: [nameIf, nameThen, nameElse],
        next: nameNext,
      };
      const dataOfBottomTextarea: IString = {
        value: bottomValue,
        if: currentTemplate[nameOfTextareaWithFocus].if,
        next: currentTemplate[nameOfTextareaWithFocus].next,
      };

      const newCurrentTemplate = structuredClone(currentTemplate);
      newCurrentTemplate[nameOfTextareaWithFocus] = dataOfTopTextarea;
      newCurrentTemplate[nameIf] = { ...initialDataTextarea };
      newCurrentTemplate[nameThen] = { ...initialDataTextarea };
      newCurrentTemplate[nameElse] = { ...initialDataTextarea };
      newCurrentTemplate[nameNext] = dataOfBottomTextarea;
      setCcurrentTemplate(newCurrentTemplate);
    }
  };

  return (
    <section>
      <h1 className={styles.head}>Message Template Editor</h1>
      <div className={styles.buttonsContainer}>{buttonsWithVariables}</div>
      <ButtonOfCondition
        onMouseDown={handleClickButtonOfCondition}
        externalStyles={styles.buttonCondition}
      />
      <div className={styles.tamplate}>{makeTemplateMarkup("beginning")}</div>
    </section>
  );
};

export default TemplateEditor;
