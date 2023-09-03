import { Dispatch } from "react";
import { initialDataTextarea } from "../../messageData";
import { IString, IMessage } from "../../messageData";

type THandleClickButtonOfCondition = (
  getNewName: () => number,
  currentTemplate: IMessage,
  setCcurrentTemplate: Dispatch<React.SetStateAction<IMessage>>
) => void;

// вставка условного ветвления при нажатии на соответствующую кнопку
export const handleClickButtonOfCondition: THandleClickButtonOfCondition = (
  getNewName,
  currentTemplate,
  setCcurrentTemplate
) => {
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
