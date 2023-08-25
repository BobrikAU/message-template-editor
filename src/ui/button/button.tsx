import { HTMLAttributes } from "react";
import styles from "./button.module.css";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string | JSX.Element;
  icon?: JSX.Element;
  onClick: () => void;
  externalStyles?: string;
}

/**
 * Данный функциональны компонент используется как инструмент для создания в дальнейшем стилизованных
 * необходимых образом кнопок
 */

const Button = ({ text, icon, externalStyles, ...props }: IButtonProps) => {
  return (
    <button
      className={`${styles.button} ${externalStyles && externalStyles}`}
      {...props}
    >
      {icon && icon}
      <span className={icon && styles.span}>{text}</span>
    </button>
  );
};

export default Button;
