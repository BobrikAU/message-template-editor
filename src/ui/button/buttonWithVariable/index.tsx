import { MouseEvent } from "react";
import styles from "./index.module.css";
import Button from "../button";

interface IButtonWithVariableProps {
  text: string;
  onMouseDown: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  disabled: boolean;
}

/**
 * Настоящий компонент используется для рендеринга кнопок с именами переменных. Имена переменных
 * получаются через пропс text.
 */
const ButtonWithVariable = ({
  text,
  onMouseDown,
  disabled,
  ...props
}: IButtonWithVariableProps) => (
  <Button
    text={text}
    onMouseDown={onMouseDown}
    {...props}
    externalStyles={styles.button}
    disabled={disabled}
  />
);

export default ButtonWithVariable;
