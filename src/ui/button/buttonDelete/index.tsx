import styles from "./index.module.css";
import Button from "../button";
import Icon from "../../icons";

interface IButtonDeleteProps {
  onClick: () => void;
  externalStyles?: string;
}

const ButtonDelete = ({ onClick, externalStyles }: IButtonDeleteProps) => (
  <Button
    icon={<Icon type="trashBasket" width="15" height="15" />}
    text="Delete"
    externalStyles={`${styles.button} ${externalStyles && externalStyles}`}
    onClick={onClick}
  />
);

export default ButtonDelete;
