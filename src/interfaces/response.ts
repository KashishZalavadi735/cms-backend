export interface SuccessRes<T> {
  status: "Success";
  statusCode: number;
  message: string;
  data: T;
}

export interface ErrorRes {
  status: "Error";
  statusCode: number;
  message: string;
  error?: unknown;
}