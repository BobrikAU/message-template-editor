import styles from "./index.module.css";
import Button from "../button";

interface IButtonWithVariableProps {
  text: string;
  onClick: () => void;
}

/**
 * Настоящий компонент используется для рендеринга кнопок с именами переменных. Имена переменных
 * получаются через пропс text.
 */
const ButtonWithVariable = ({
  text,
  onClick,
  ...props
}: IButtonWithVariableProps) => (
  <Button
    text={text}
    onClick={onClick}
    {...props}
    externalStyles={styles.button}
  />
);

export default ButtonWithVariable;
