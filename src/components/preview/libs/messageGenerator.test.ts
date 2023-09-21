import { messageGenerator } from "./messageGenerator";

// шаблон сообщения
const template = {
  1: { value: "{company}", if: null, next: null },
  2: { value: "I know you work at {company}", if: ["5", "6", "7"], next: "8" },
  3: { value: "Where do you work at the moment?", if: null, next: null },
  4: {
    value: "\n\nJake\nSoftware Developer\njakelennard911@gmail.com",
    if: null,
    next: null,
  },
  5: { value: "{position}", if: null, next: null },
  6: { value: " as {position}.", if: null, next: null },
  7: { value: ", but what is your role?", if: null, next: null },
  8: { value: " ;)", if: null, next: null },
  beginning: {
    value:
      "Hello {firstname}!\nI just went through your profile and I would love to join your network! ",
    if: ["1", "2", "3"],
    next: "4",
  },
};

// шаблон сообщения со словом в фигурных скобках, которое не входит в массив переменных
const templateWithUnexpectedVariable = {
  ...template,
  6: { value: " as {position}{friend}.", if: null, next: null },
};

// значение переменных
const values = {
  firstname: "Bill",
  lastname: "Gates",
  company: "Bill & Melinda Gates Foundation",
  position: "Co-chair",
};

// значение переменных без определенния одной переменной
const valuesWithoutOne = {
  ...values,
  position: "",
};

// значение переменных без определенния двух переменных
const valuesWithoutTwo = {
  ...valuesWithoutOne,
  company: "",
};

it("все переменные определены", () => {
  const result = messageGenerator(template, values);
  expect(result).toBe(
    "Hello Bill!\nI just went through your profile and I would love to join your network! I know you work at Bill & Melinda Gates Foundation as Co-chair. ;)\n\nJake\nSoftware Developer\njakelennard911@gmail.com"
  );
});

it('не определена переменная "position"', () => {
  const result = messageGenerator(template, valuesWithoutOne);
  expect(result).toBe(
    "Hello Bill!\nI just went through your profile and I would love to join your network! I know you work at Bill & Melinda Gates Foundation, but what is your role? ;)\n\nJake\nSoftware Developer\njakelennard911@gmail.com"
  );
});

it('не определены переменные "position" и "company"', () => {
  const result = messageGenerator(template, valuesWithoutTwo);
  expect(result).toBe(
    "Hello Bill!\nI just went through your profile and I would love to join your network! Where do you work at the moment?\n\nJake\nSoftware Developer\njakelennard911@gmail.com"
  );
});

it("шаблон с непредусмотренной переменной", () => {
  const result = messageGenerator(templateWithUnexpectedVariable, values);
  expect(result).toBe(
    "Hello Bill!\nI just went through your profile and I would love to join your network! I know you work at Bill & Melinda Gates Foundation as Co-chair{friend}. ;)\n\nJake\nSoftware Developer\njakelennard911@gmail.com"
  );
});
