import styles from "./index.module.css";
import { HTMLAttributes } from "react";

interface ISpanProps extends HTMLAttributes<HTMLSpanElement> {
  text: "IF" | "THEN" | "ELSE";
}

const Span = ({ text, ...props }: ISpanProps) => {
  return (
    <span className={styles.span} {...props}>
      {text}
    </span>
  );
};

export default Span;
