export default function (error: any): string {
  let errorMessage;
  if (error.response) {
    errorMessage = error.response.message || 'Unknown error';
  } else {
    errorMessage = error.message || 'Unknown error';
  }
  return errorMessage;
}
