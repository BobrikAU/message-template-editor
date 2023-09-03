import { MouseEvent, Dispatch } from "react";
import { IString, IMessage } from "../../messageData";

type THandleButtonDeleteClick = (
  e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  currentTemplate: IMessage,
  setCcurrentTemplate: Dispatch<React.SetStateAction<IMessage>>
) => void;

// обработка клика на кнопку delete (удаление условного ветвления)
export const handleButtonDeleteClick: THandleButtonDeleteClick = (
  e,
  currentTemplate,
  setCcurrentTemplate
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
