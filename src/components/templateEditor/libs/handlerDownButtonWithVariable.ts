import { MouseEvent } from "react";

// добавление переменных при нажатии на кнопку
export const handleDownButtonWithVariable = (
  e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  updateCurrentTemplateValue: (nameTextarea: string, newValue: string) => void
) => {
  const elementWithFocus = document.activeElement;
  const textButton = e.currentTarget.textContent;
  if (textButton) {
    if (elementWithFocus && elementWithFocus.tagName === "TEXTAREA") {
      const textareatWithFocus = document.activeElement as HTMLTextAreaElement;
      const start = textareatWithFocus.selectionStart;
      const end = textareatWithFocus.selectionEnd;
      setTimeout(() => {
        textareatWithFocus.focus();
        textareatWithFocus.setRangeText(textButton, start, end, "end");
        updateCurrentTemplateValue(
          textareatWithFocus.name,
          textareatWithFocus.value
        );
      });
    } else if (
      elementWithFocus === null ||
      elementWithFocus.tagName !== "TEXTAREA"
    ) {
      const firstTextarea = document.querySelector("textarea");
      if (firstTextarea) {
        firstTextarea.setRangeText(textButton, 0, 0, "end");
        updateCurrentTemplateValue(firstTextarea.name, firstTextarea.value);
      }
    }
  }
};
