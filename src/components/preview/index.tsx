import { Dispatch, useState, useRef } from "react";
import { nanoid } from "nanoid";
import { ControlButton } from "../../ui/button";
import styles from "./index.module.css";
import { IMessage } from "../messageData";
import Variable from "./variable";
import { messageGenerator } from "./libs/messageGenerator";

interface IPreviewProps {
  closeWidjet: Dispatch<React.SetStateAction<boolean>>;
  arrVarNames: string[];
  template: IMessage;
  isPreviewVisible: boolean;
  setIsPreviewVisible: Dispatch<React.SetStateAction<boolean>>;
}

const Preview = ({
  closeWidjet,
  arrVarNames,
  template,
  isPreviewVisible,
  setIsPreviewVisible,
}: IPreviewProps) => {
  // создаем массив с неизменными id для использования в значении key при создании массива компонентов
  const idsRef = useRef(
    (function () {
      const array = [];
      for (let i = 0; i < arrVarNames.length; i++) {
        array.push(nanoid());
      }
      return array;
    })()
  );

  // создаем объект, в котором мы будем сохранять набираемые пользователем значения переменных
  const initialValue: { [name: string]: string } = {};
  arrVarNames.forEach((item) => {
    initialValue[item] = "";
  });
  const [values, setValues] = useState<{ [name: string]: string }>(
    initialValue
  );

  // массив полей для ввода значений переменных
  const variables = arrVarNames.map((item, index) => {
    return (
      <Variable
        item={item}
        values={values}
        setValue={setValues}
        key={idsRef.current[index]}
      />
    );
  });

  const handleClickCloseButton = () => {
    setIsPreviewVisible(false);
    setTimeout(() => closeWidjet(false), 300);
  };

  return (
    <section
      className={`${styles.preview} ${
        isPreviewVisible && styles.preview_visible
      }`}
    >
      <div className={styles.previewWidget}>
        <h2 className={styles.header}>Message Preview</h2>
        <pre className={styles.messageWindow}>
          {messageGenerator(template, values)}
        </pre>
        <span className={styles.nameRowWithVariables}>Variables:</span>
        <ul className={styles.variables}>{variables}</ul>
        <ControlButton
          onClick={handleClickCloseButton}
          text="Close"
          externalStyles={styles.closeButton}
        />
      </div>
    </section>
  );
};

export default Preview;
