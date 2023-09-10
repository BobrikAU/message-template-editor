import { Set } from "typescript";
import { IMessage, IString } from "../../messageData";

export function messageGenerator(
  template: IMessage,
  values: { [name: string]: string }
): string {
  // обработка текстовой части объекта шаблона - нахождение переменных и вставка их значений
  const editText = (partOfTemplate: IString) => {
    const regExp = /\{[\wа-яА-ЯёЁ\s]+\}/gi;
    let text = partOfTemplate.value;
    const variablesArray = new Set(text.match(regExp));
    variablesArray.forEach((item) => {
      const textWithoutBrackets = item.slice(1, item.length - 1);
      if (values[textWithoutBrackets] !== undefined) {
        text = text.replaceAll(item, values[textWithoutBrackets]);
      }
    });
    return text;
  };

  // обработка всего шаблона
  const processTemplate = (partOfTemplate: IString) => {
    let result = "";
    // обработка текстового значения части шаблона
    result = result + editText(partOfTemplate);
    // обработка условного ветвления части шаблона
    if (partOfTemplate.if) {
      // обработка части ветвдения с условием
      const name = partOfTemplate.if[0];
      const textCondition = processTemplate(template[name]);
      if (textCondition) {
        // если значение условия дает true
        const name = partOfTemplate.if[1];
        result = result + processTemplate(template[name]);
      } else {
        // если значение условия дает false
        const name = partOfTemplate.if[2];
        result = result + processTemplate(template[name]);
      }
    }
    // обработка последующего выражения
    const name = partOfTemplate.next;
    if (name) {
      result = result + processTemplate(template[name]);
    }
    return result;
  };

  return processTemplate(template.beginning);
}
