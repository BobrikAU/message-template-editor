import { Dispatch, useState, useRef } from "react";
import { nanoid } from "nanoid";
import { ControlButton } from "../../ui/button";
import styles from "./index.module.css";
import { IMessage } from "../messageData";
import Variable from "./variable";

interface IPreviewProps {
  closeWidjet: Dispatch<React.SetStateAction<boolean>>;
  arrVarNames: string[];
  template: IMessage;
}

const Preview = ({ closeWidjet, arrVarNames, template }: IPreviewProps) => {
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

  // объект со значениями переменных
  const initialValue: { [name: string]: string } = {};
  arrVarNames.forEach((item) => {
    initialValue[item] = "";
  });
  const [values, setValues] = useState<{ [name: string]: string }>(
    initialValue
  );

  // поля для ввода значений переменных
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

  return (
    <section className={styles.preview}>
      <div className={styles.previewWidget}>
        <h2 className={styles.header}>Message Preview</h2>
        <pre className={styles.messageWindow}></pre>
        <span className={styles.nameRowWithVariables}>Variables:</span>
        <ul className={styles.variables}>{variables}</ul>
        <ControlButton
          onClick={() => closeWidjet(false)}
          text="Close"
          externalStyles={styles.closeButton}
        />
      </div>
    </section>
  );
};

export default Preview;
