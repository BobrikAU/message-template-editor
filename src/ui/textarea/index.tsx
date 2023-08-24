import { useState } from "react";
import { HTMLAttributes } from "react";
import styles from "./index.module.css";

interface ITextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  value: string;
  changeHandler: () => void;
  name: string;
}

const Textarea = ({ name, value, changeHandler, ...props }: ITextareaProps) => {
  const [textareaValue, setTextareaValue] = useState(value);

  function onInput(e: React.FormEvent<HTMLTextAreaElement>) {
    const element = e.target as HTMLTextAreaElement;
    element.style.height = "min-content";
    element.style.height = `${element.scrollHeight - 14}px`;
    setTextareaValue(element.value);
  }

  return (
    <textarea
      name={name}
      value={textareaValue}
      rows={1}
      onInput={(e) => onInput(e)}
      onChange={changeHandler}
      className={styles.textarea}
      {...props}
    ></textarea>
  );
};

export default Textarea;
