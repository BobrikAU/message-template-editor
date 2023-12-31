import styles from "./index.module.css";
import Button from "../button";
import Span from "../../span";

interface IButtonOfConditionProps {
  onMouseDown: () => void;
  externalStyles?: string;
  disabled: boolean;
}

/**
 * Данный компонент - кнопка для вставки подвиджета условного ветвления IF-THEN-ELSE
 */
const ButtonOfCondition = ({
  onMouseDown,
  externalStyles,
  disabled,
}: IButtonOfConditionProps) => {
  const text = (
    <span>
      <span className={styles.bold}>Click to add</span>: <Span text="IF" />{" "}
      &#91;&#123;some_variable&#125; or expression&#93; <Span text="THEN" />{" "}
      &#91;then_value&#93; <Span text="ELSE" /> &#91;else_value&#93;
    </span>
  );
  return (
    <Button
      text={text}
      onMouseDown={onMouseDown}
      externalStyles={`${styles.button} ${externalStyles}`}
      disabled={disabled}
    />
  );
};

export default ButtonOfCondition;
