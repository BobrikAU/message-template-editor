import styles from "./index.module.css";
import Button from "../button";
import Icon from "../../icons";

interface IControlButtonProps {
  text: "Preview" | "Save" | "Close";
  onClick: () => void;
  externalStyles?: string;
  disabled?: boolean;
}
/**
 * Данный функциональный компонент используется для рендеринга кнопок панели уплавления виджета
 * редактирования шаблона (открытие виджета предпросмотра шаблона сообщений, сохранение шаблона
 * сообщений и закрытия редактора)
 */
const ControlButton = ({
  onClick,
  text,
  externalStyles,
  disabled,
}: IControlButtonProps) => {
  let icon = <></>;
  switch (text) {
    case "Preview":
      icon = <Icon type="molber" width="20" height="20" color="#fff" />;
      break;
    case "Close":
      icon = <Icon type="close" width="20" height="20" color="#fff" />;
      break;
    case "Save":
      icon = <Icon type="mark" width="20" height="20" color="#fff" />;
      break;
    default:
      break;
  }

  return (
    <Button
      text={text}
      icon={icon}
      onClick={onClick}
      externalStyles={`${styles.button} ${externalStyles}`}
      disabled={disabled}
    />
  );
};

export default ControlButton;
