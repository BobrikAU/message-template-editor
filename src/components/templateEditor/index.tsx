import { useState, useRef, Dispatch, useEffect } from "react";
import { nanoid } from "nanoid";
import styles from "./index.module.css";
import { ButtonWithVariable, ButtonOfCondition } from "../../ui/button";
import Textarea from "../../ui/textarea";
import { IMessage, initialDataTextarea } from "../messageData";
import Span from "../../ui/span";
import { ButtonDelete } from "../../ui/button";
import { ControlButton } from "../../ui/button";
import { handleDownButtonWithVariable } from "./libs/handlerDownButtonWithVariable";
import { handleButtonDeleteClick } from "./libs/handleButtonDeleteClick";
import { determineHeightTemplateBlock } from "./libs/determiningHeightTemplateBlock";
import { handleClickButtonOfCondition } from "./libs/handlerClickButtonOfCondition";
import { createPortal } from "react-dom";
import Preview from "../preview";

interface ITemplateEditorProps {
  arrVarNames: string[];
  template?: IMessage | null;
  setStep?: Dispatch<React.SetStateAction<number>>;
  callbackSave: (currentTemplate: IMessage) => void;
}

const TemplateEditor = ({
  arrVarNames,
  template,
  setStep,
  callbackSave,
}: ITemplateEditorProps) => {
  // для расчета высоты блока с шаблоном
  const headRef = useRef<HTMLHeadingElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const buttonConditionRef = useRef<HTMLDivElement>(null);
  const controlPanelRef = useRef<HTMLDivElement>(null);

  const [showPreview, setShowPreview] = useState(false);

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
  // обновление значения текстовых полей при их редактировании
  const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    updateCurrentTemplateValue(e.currentTarget.name, e.currentTarget.value);
  };

  // счетчик для установления уникальных имен для текстовых полей
  const refOrdinal = useRef<number>(
    template
      ? Math.max(
          ...Object.keys(template)
            .map((i) => Number.parseInt(i, 10))
            .filter((i) => !Number.isNaN(i))
        )
      : 0
  );
  const getNewName = () => {
    refOrdinal.current++;
    return refOrdinal.current;
  };

  // формирование ряда кнопок с переменными
  const buttonsWithVariables = arrVarNames.map((item) => (
    <ButtonWithVariable
      text={`{${item}}`}
      onMouseDown={(e) =>
        handleDownButtonWithVariable(e, updateCurrentTemplateValue)
      }
      key={nanoid()}
    />
  ));

  // формирование разметки редактора сообщения
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
        {condition && (
          <div className={styles.containerConditions}>
            {/*часть, вычисляющая булевый результат условия, с текстом или блоком IF-THEN-ELSE*/}
            <div className={styles.conditionLabel}>
              <Span text="IF" externalStyles={styles.condition} />
              <ButtonDelete
                dataTextareaName={dataName}
                onClick={(e) =>
                  handleButtonDeleteClick(
                    e,
                    currentTemplate,
                    setCcurrentTemplate
                  )
                }
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

  // определение высоты блока с разметкой шаблона
  useEffect(() => {
    function makeTemplateHeight() {
      determineHeightTemplateBlock(
        headRef.current,
        buttonsContainerRef.current,
        buttonConditionRef.current,
        controlPanelRef.current
      );
    }
    makeTemplateHeight();
    window.addEventListener("resize", makeTemplateHeight);
    return () => window.removeEventListener("resize", makeTemplateHeight);
  }, []);

  return (
    <>
      <script>alert(111)</script>
      <section className={styles.templateEditor}>
        <h1 className={styles.head} ref={headRef}>
          Message Template Editor
        </h1>
        <div className={styles.buttonsContainer} ref={buttonsContainerRef}>
          {buttonsWithVariables}
        </div>
        <div className={styles.buttonCondition} ref={buttonConditionRef}>
          <ButtonOfCondition
            onMouseDown={() =>
              handleClickButtonOfCondition(
                getNewName,
                currentTemplate,
                setCcurrentTemplate
              )
            }
          />
        </div>
        <div className={styles.template}>{makeTemplateMarkup("beginning")}</div>
        <div className={styles.controlPanel} ref={controlPanelRef}>
          <ControlButton
            text="Preview"
            onClick={() => setShowPreview(true)}
            externalStyles={styles.controlButton}
          />
          <ControlButton
            text="Save"
            onClick={() => callbackSave(currentTemplate)}
            externalStyles={styles.controlButton}
          />
          <ControlButton
            text="Close"
            onClick={() => setStep && setStep(1)}
            externalStyles={styles.controlButton}
          />
        </div>
      </section>
      {showPreview &&
        createPortal(
          <Preview
            closeWidjet={setShowPreview}
            template={currentTemplate}
            arrVarNames={arrVarNames}
          />,
          document.body
        )}
    </>
  );
};

export default TemplateEditor;
