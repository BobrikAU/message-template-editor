import { MouseEvent } from "react";
import styles from "./index.module.css";
import Button from "../button";
import Icon from "../../icons";

interface IButtonDeleteProps {
  onClick: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  externalStyles?: string;
  dataTextareaName: string;
  disabled: boolean;
}

/**
 * Настоящий компонент - это кнопка удаления подвижета условного ветвления IF-THEN-ELSE
 */
const ButtonDelete = ({
  onClick,
  externalStyles,
  dataTextareaName,
  disabled,
}: IButtonDeleteProps) => (
  <Button
    icon={<Icon type="trashBasket" width="15" height="15" />}
    text="Delete"
    externalStyles={`${styles.button} ${externalStyles && externalStyles}`}
    onClick={onClick}
    data-name={dataTextareaName}
    disabled={disabled}
  />
);

export default ButtonDelete;
