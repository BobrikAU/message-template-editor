import styles from "./index.module.css";
import Button from "../button";
import Icon from "../../icons";

interface IButtonDeleteProps {
  onClick: () => void;
}

const ButtonDelete = ({ onClick }: IButtonDeleteProps) => (
  <Button
    icon={<Icon type="trashBasket" width="15" height="15" />}
    text="Delete"
    externalStyles={styles.button}
    onClick={onClick}
  />
);

export default ButtonDelete;
