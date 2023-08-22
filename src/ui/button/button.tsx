import { HTMLAttributes } from "react";
import styles from "./button.module.css";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: JSX.Element;
  onClick: () => void;
  externalStyles?: string;
}

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
