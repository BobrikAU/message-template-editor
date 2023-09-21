type TDetermineHeightTemplateBlock = (
  headRef: HTMLHeadingElement | null,
  buttonsContainerRef: HTMLUListElement | null,
  buttonConditionRef: HTMLDivElement | null,
  controlPanelRef: HTMLDivElement | null
) => void;

export const determineHeightTemplateBlock: TDetermineHeightTemplateBlock = (
  headRef,
  buttonsContainerRef,
  buttonConditionRef,
  controlPanelRef
) => {
  if (headRef && buttonsContainerRef && buttonConditionRef && controlPanelRef) {
    const templateHeight =
      window.innerHeight -
      (headRef.clientHeight +
        buttonsContainerRef.clientHeight +
        buttonConditionRef.clientHeight +
        controlPanelRef.clientHeight);
    document.documentElement.style.setProperty(
      "--heightOftemplate",
      templateHeight + "px"
    );
  }
};
