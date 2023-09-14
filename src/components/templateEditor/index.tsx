import { useState, useRef, Dispatch, useEffect } from "react";
import { nanoid } from "nanoid";
import styles from "./index.module.css";
import { ButtonWithVariable, ButtonOfCondition } from "../../ui/button";
import { IMessage, initialDataTextarea } from "../messageData";
import { ControlButton } from "../../ui/button";
import { handleDownButtonWithVariable } from "./libs/handlerDownButtonWithVariable";
import { determineHeightTemplateBlock } from "./libs/determiningHeightTemplateBlock";
import { handleClickButtonOfCondition } from "./libs/handlerClickButtonOfCondition";
import makeTemplateMarkup from "./libs/makeTemplateMarkup";
import { createPortal } from "react-dom";
import Preview from "../preview";

interface ITemplateEditorProps {
  arrVarNames: string[];
  template?: IMessage | null;
  setStep: Dispatch<React.SetStateAction<number>>;
  setIsOpenEditorButtonVisiebel: Dispatch<React.SetStateAction<boolean>>;
  callbackSave: (currentTemplate: IMessage) => void;
  isTemplateEditorVisible: boolean;
  setIsTemplateEditorVisible: Dispatch<React.SetStateAction<boolean>>;
}

const TemplateEditor = ({
  arrVarNames,
  template,
  setStep,
  callbackSave,
  setIsOpenEditorButtonVisiebel,
  isTemplateEditorVisible,
  setIsTemplateEditorVisible,
}: ITemplateEditorProps) => {
  // для расчета высоты блока с шаблоном
  const headRef = useRef<HTMLHeadingElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const buttonConditionRef = useRef<HTMLDivElement>(null);
  const controlPanelRef = useRef<HTMLDivElement>(null);

  const [showPreview, setShowPreview] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

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
      <section
        className={`${styles.templateEditor} ${
          isTemplateEditorVisible && styles.schowedTemplateEditor
        }`}
      >
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
        <div className={styles.template}>
          {makeTemplateMarkup(
            "beginning",
            currentTemplate,
            updateCurrentTemplateValue,
            setCcurrentTemplate
          )}
        </div>
        <div className={styles.controlPanel} ref={controlPanelRef}>
          <ControlButton
            text="Preview"
            onClick={() => {
              setShowPreview(true);
              setTimeout(() => setIsPreviewVisible(true));
            }}
            externalStyles={styles.controlButton}
          />
          <ControlButton
            text="Save"
            onClick={() => callbackSave(currentTemplate)}
            externalStyles={styles.controlButton}
          />
          <ControlButton
            text="Close"
            onClick={() => {
              setIsTemplateEditorVisible(false);
              setTimeout(() => {
                setStep(1);
                setTimeout(() => setIsOpenEditorButtonVisiebel(true));
              }, 300);
            }}
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
            isPreviewVisible={isPreviewVisible}
            setIsPreviewVisible={setIsPreviewVisible}
          />,
          document.body
        )}
    </>
  );
};

export default TemplateEditor;
