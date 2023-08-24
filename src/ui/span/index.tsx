import styles from "./index.module.css";
import { HTMLAttributes } from "react";

interface ISpanProps extends HTMLAttributes<HTMLSpanElement> {
  text: "IF" | "THEN" | "ELSE";
  externalStyles?: string;
}

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
