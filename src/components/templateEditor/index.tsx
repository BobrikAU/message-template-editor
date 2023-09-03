import { useState, MouseEvent, useRef, MouseEventHandler } from "react";
import { nanoid } from "nanoid";
import styles from "./index.module.css";
import { ButtonWithVariable, ButtonOfCondition } from "../../ui/button";
import Textarea from "../../ui/textarea";
import { IMessage, IString } from "../messageData";
import Span from "../../ui/span";
import { ButtonDelete } from "../../ui/button";
import { ControlButton } from "../../ui/button";

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

  // обработка клика на кнопку delete (удаление условного ветвления)
  const hendleButtonDeleteClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    // получаем имя текстового поля, который над удаляемым условным ветвлением
    const nameTopTextarea = (e.currentTarget as HTMLButtonElement).dataset.name;
    if (nameTopTextarea) {
      // получаем данные о текстовых полях над и под условным ветвлением
      const dataTopTexatarea = currentTemplate[nameTopTextarea];
      const dataBottomTextarea =
        currentTemplate[dataTopTexatarea.next ? dataTopTexatarea.next : ""];
      // формируем данные для текстового поля, который будет после удаления условного ветвления
      const newDataTopTexatarea = {
        ...dataBottomTextarea,
        value: dataTopTexatarea.value + dataBottomTextarea.value,
      };
      // формируем список имён текстовых полей, данные о которых надо удалить
      const setTextareaNamesToDelete = new Set<string>();
      const fillSetTextareaNamesToDelete = (
        data: IString,
        next?: string | null
      ) => {
        const condition = data.if;
        const nameBottomTextarea = data.next;
        if (condition && nameBottomTextarea) {
          setTextareaNamesToDelete.add(condition[0]);
          fillSetTextareaNamesToDelete(currentTemplate[condition[0]], next);
          setTextareaNamesToDelete.add(condition[1]);
          fillSetTextareaNamesToDelete(currentTemplate[condition[1]], next);
          setTextareaNamesToDelete.add(condition[2]);
          fillSetTextareaNamesToDelete(currentTemplate[condition[2]], next);
          setTextareaNamesToDelete.add(nameBottomTextarea);
          if (next && data.next !== next) {
            fillSetTextareaNamesToDelete(
              currentTemplate[nameBottomTextarea],
              next
            );
          }
        }
      };
      fillSetTextareaNamesToDelete(dataTopTexatarea, dataTopTexatarea.next);
      // формируем новые данные о шаблоне без удаленной части
      const newCurrentTemplate = {
        ...currentTemplate,
        [nameTopTextarea]: newDataTopTexatarea,
      };
      setTextareaNamesToDelete.forEach((item) => {
        delete newCurrentTemplate[item];
      });
      setCcurrentTemplate(newCurrentTemplate);
    }
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
          value={currentTemplate[dataName].value || dataName}
          changeHandler={handleChangeTextarea}
        />
        {condition && (
          <div className={styles.containerConditions}>
            {/*часть, вычисляющая булевый результат условия, с текстом или блоком IF-THEN-ELSE*/}
            <div className={styles.conditionLabel}>
              <Span text="IF" externalStyles={styles.condition} />
              <ButtonDelete
                dataTextareaName={dataName}
                onClick={hendleButtonDeleteClick}
              />
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

  // вставка условного ветвления при нажатии на соответствующую кнопку
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

  // определение высоты блока с разметкой шаблона
  const headRef = useRef<HTMLHeadingElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const buttonConditionRef = useRef<HTMLDivElement>(null);
  const controlPanelRef = useRef<HTMLDivElement>(null);
  if (
    headRef.current &&
    buttonsContainerRef.current &&
    buttonConditionRef.current &&
    controlPanelRef.current
  ) {
    const hhh =
      window.innerHeight -
      (headRef.current.clientHeight +
        buttonsContainerRef.current.clientHeight +
        buttonConditionRef.current.clientHeight +
        controlPanelRef.current.clientHeight);
    document.documentElement.style.setProperty(
      "--heightOftemplate",
      hhh + "px"
    );
  }

  return (
    <main className={styles.templateEditor}>
      <h1 className={styles.head} ref={headRef}>
        Message Template Editor
      </h1>
      <div className={styles.buttonsContainer} ref={buttonsContainerRef}>
        {buttonsWithVariables}
      </div>
      <div className={styles.buttonCondition} ref={buttonConditionRef}>
        <ButtonOfCondition onMouseDown={handleClickButtonOfCondition} />
      </div>
      <div className={styles.template}>{makeTemplateMarkup("beginning")}</div>
      <div className={styles.controlPanel} ref={controlPanelRef}>
        <ControlButton
          text="Preview"
          onClick={() => {}}
          externalStyles={styles.controlButton}
        />
        <ControlButton
          text="Save"
          onClick={() => {}}
          externalStyles={styles.controlButton}
        />
        <ControlButton
          text="Close"
          onClick={() => {}}
          externalStyles={styles.controlButton}
        />
      </div>
    </main>
  );
};

export default TemplateEditor;
