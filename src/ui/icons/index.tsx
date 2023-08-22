import { HTMLAttributes } from "react";
import IconClose from "./close";
import IconCheckMark from "./check_mark";
import IconMolber from "./molber";
import IconTrashBasket from "./trash_basket";

interface IIconsProps extends HTMLAttributes<SVGSVGElement> {
  type: "close" | "mark" | "molber" | "trashBasket";
  width?: string;
  height?: string;
  color?: string;
}

const Icon = ({ type, width, height, color, ...props }: IIconsProps) => {
  let icon: JSX.Element = <></>;
  switch (type) {
    case "close":
      icon = (
        <IconClose width={width} height={height} color={color} {...props} />
      );
      break;
    case "mark":
      icon = (
        <IconCheckMark width={width} height={height} color={color} {...props} />
      );
      break;
    case "molber":
      icon = (
        <IconMolber width={width} height={height} color={color} {...props} />
      );
      break;
    case "trashBasket":
      icon = (
        <IconTrashBasket
          width={width}
          height={height}
          color={color}
          {...props}
        />
      );
      break;
    default:
      break;
  }
  return icon;
};

export default Icon;
