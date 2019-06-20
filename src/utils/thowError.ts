export default (message: string, body?: Object): any => {
  const error: any = new Error(message);
  error.isOperational = true;
  error.status = 400;
  error.body = body;
  error.errorType = message;
  throw error;
};
