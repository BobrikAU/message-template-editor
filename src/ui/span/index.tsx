import styles from "./index.module.css";
import { HTMLAttributes } from "react";

interface ISpanProps extends HTMLAttributes<HTMLSpanElement> {
  text: "IF" | "THEN" | "ELSE";
  externalStyles?: string;
}

/**
 * Настоящий элемент предназначен для рендеринга стилизованных ярлыков, обозначающих значение
 * строк условного ветвления, который может быть одним из трёх вариантов: if, then или else.
 */
const Span = ({ text, externalStyles, ...props }: ISpanProps) => {
  return (
    <span
      className={`${styles.span} ${externalStyles && externalStyles}`}
      {...props}
    >
      {text}
    </span>
  );
};

export default Span;
