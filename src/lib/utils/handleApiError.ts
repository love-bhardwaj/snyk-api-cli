export default function (error: any): string {
  let errorMessage;
  if (error.response) {
    errorMessage = error.response.error || error.error.message;
  } else {
    errorMessage = error.message || "Unknown error";
  }
  return errorMessage;
}
