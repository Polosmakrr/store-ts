export interface IError extends Error {
  status: number;
  message: string;
  name: string;
}
