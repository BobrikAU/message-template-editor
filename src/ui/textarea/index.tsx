import { useState } from "react";
import { HTMLAttributes } from "react";
import styles from "./index.module.css";

interface ITextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  value: string;
  changeHandler: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  name: string;
  externalStyles?: string;
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
  ...props
}: ITextareaProps) => {
  // обработчик события input, обеспечивающий обновление значения value и подбор высоты поля,
  // которая позволяет избежать появление вертикального скрола
  function onInput(e: React.FormEvent<HTMLTextAreaElement>) {
    const element = e.target as HTMLTextAreaElement;
    element.style.height = "min-content";
    element.style.height = `${element.scrollHeight - 14}px`;
    changeHandler(e);
  }

  return (
    <textarea
      name={name}
      value={value}
      rows={1}
      onInput={onInput}
      className={`${styles.textarea} ${externalStyles && externalStyles}`}
      {...props}
    ></textarea>
  );
};

export default Textarea;
