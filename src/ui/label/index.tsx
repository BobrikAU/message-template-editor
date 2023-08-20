import styles from "./index.module.css";

interface ISpan {
  name: "IF" | "THEN" | "ELSE";
}

const Span = ({ name }: ISpan) => {
  return <span className={styles.span}>{name}</span>;
};

export default Span;
