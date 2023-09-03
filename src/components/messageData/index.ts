export interface IString {
  value: string;
  if: null | string[];
  next: null | string;
}

export interface IMessage {
  [name: string]: IString;
}

export const initialDataTextarea: IString = {
  value: "",
  if: null,
  next: null,
};
