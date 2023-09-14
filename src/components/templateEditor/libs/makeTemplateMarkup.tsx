import { Dispatch } from "react";
import { IMessage, initialDataTextarea } from "../../messageData";
import Textarea from "../../../ui/textarea";
import Span from "../../../ui/span";
import { ButtonDelete } from "../../../ui/button";
import { handleButtonDeleteClick } from "./handleButtonDeleteClick";
import styles from "./makeTemplateMarkup.module.css";

type MakeTemplateMarkup = (
  dataName: string,
  currentTemplate: IMessage,
  updateCurrentTemplateValue: (nameTextarea: string, newValue: string) => void,
  setCcurrentTemplate: Dispatch<React.SetStateAction<IMessage>>
) => JSX.Element;

const makeTemplateMarkup: MakeTemplateMarkup = (
  dataName,
  currentTemplate,
  updateCurrentTemplateValue,
  setCcurrentTemplate
) => {
  const condition = currentTemplate[dataName].if;
  const [nameIf, nameThen, nameElse] = condition
    ? condition
    : [null, null, null];
  const nameNext = currentTemplate[dataName].next;
  // обновление значения текстовых полей при их редактировании
  const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    updateCurrentTemplateValue(e.currentTarget.name, e.currentTarget.value);
  };
  const templateMarkup: JSX.Element = (
    <>
      <Textarea
        name={dataName}
        value={currentTemplate[dataName].value}
        changeHandler={handleChangeTextarea}
      />
      {condition && (
        <div className={styles.containerConditions}>
          {/*часть, вычисляющая булевый результат условия, с текстом или блоком IF-THEN-ELSE*/}
          <div className={styles.conditionLabel}>
            <Span text="IF" externalStyles={styles.condition} />
            <ButtonDelete
              dataTextareaName={dataName}
              onClick={(e) =>
                handleButtonDeleteClick(e, currentTemplate, setCcurrentTemplate)
              }
            />
          </div>
          <div className={styles.conditionText}>
            {makeTemplateMarkup(
              nameIf ? nameIf : "",
              currentTemplate,
              updateCurrentTemplateValue,
              setCcurrentTemplate
            )}
          </div>
          {/*часть, активная при вычислении в условии true, с текстом или блоком IF-THEN-ELSE*/}
          <div className={styles.conditionLabel}>
            <Span text="THEN" externalStyles={styles.then} />
          </div>
          <div className={styles.conditionText}>
            {makeTemplateMarkup(
              nameThen ? nameThen : "",
              currentTemplate,
              updateCurrentTemplateValue,
              setCcurrentTemplate
            )}
          </div>
          {/*часть, активная при вычислении в условии false, с текстом или блоком IF-THEN-ELSE*/}
          <div className={styles.conditionLabel}>
            <Span text="ELSE" externalStyles={styles.else} />
          </div>
          <div className={styles.conditionText}>
            {makeTemplateMarkup(
              nameElse ? nameElse : "",
              currentTemplate,
              updateCurrentTemplateValue,
              setCcurrentTemplate
            )}
          </div>
        </div>
      )}
      {nameNext &&
        makeTemplateMarkup(
          nameNext,
          currentTemplate,
          updateCurrentTemplateValue,
          setCcurrentTemplate
        )}
    </>
  );
  return templateMarkup;
};

export default makeTemplateMarkup;
