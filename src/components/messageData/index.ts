export interface IString {
  value: string;
  if: null | string[];
  next: null | string;
}

export interface IMessage {
  [name: string]: IString;
}

// interface IMassegeData{
//     startNumber: number;
// }

// class MassegeData {
//   data: IMessage;
//   constructor(startNumber: string) {
//     this.data = {
//       beginig: startNumber,
//     };
//   }
// }
