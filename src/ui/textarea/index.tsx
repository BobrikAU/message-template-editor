import { useRef, useEffect } from "react";
import { HTMLAttributes } from "react";
import styles from "./index.module.css";

interface ITextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  value: string;
  changeHandler: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  name: string;
  externalStyles?: string;
  disabled?: boolean;
}

/**
 * Данный элемент используется как поле, в котором пользователь набирает текст и где он вставляет
 * переменные
 */

const Textarea = ({
  name,
  value,
  changeHandler,
  externalStyles,
  disabled,
  ...props
}: ITextareaProps) => {
  const refTextarea = useRef<HTMLTextAreaElement>(null);
  // подбор высоты поля, которое позволяет избежать появление вертикального скрола
  function determinateHeight() {
    const element = refTextarea.current;
    if (element) {
      element.style.height = "min-content";
      element.style.height = `${element.scrollHeight - 14}px`;
    }
  }
  useEffect(() => determinateHeight(), [value]);

  return (
    <textarea
      name={name}
      value={value}
      rows={1}
      onInput={changeHandler}
      className={`${styles.textarea} ${externalStyles && externalStyles}`}
      ref={refTextarea}
      disabled={disabled}
      {...props}
    ></textarea>
  );
};

export default Textarea;
