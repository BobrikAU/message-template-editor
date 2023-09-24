import Button from "../button";

interface IOpenEditorButtonProps {
  onClick: () => void;
  externalStyles?: string;
}

const OpenEditorButton = ({
  onClick,
  externalStyles,
}: IOpenEditorButtonProps) => (
  <Button
    text="Message Editor"
    onClick={onClick}
    externalStyles={externalStyles}
  />
);

export default OpenEditorButton;
