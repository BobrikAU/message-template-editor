import { Dispatch } from "react";
import styles from "./index.module.css";

interface IVariableProps {
  item: string;
  values: { [name: string]: string };
  setValue: Dispatch<React.SetStateAction<{ [name: string]: string }>>;
}

const Variable = ({ item, values, setValue }: IVariableProps) => {
  return (
    <li className={styles.variable}>
      <label htmlFor={`input${item}`} className={styles.variableLabel}>
        {item}
      </label>
      <input
        id={`input${item}`}
        type="text"
        name={item}
        placeholder={item}
        value={values[item]}
        className={styles.variableInput}
        onInput={(e) => {
          setValue({ ...values, [item]: e.currentTarget.value });
        }}
        autoComplete="off"
      />
    </li>
  );
};

export default Variable;
