export default (obj: any) => {
  try {
    return JSON.stringify(obj, null, 4);
  } catch (error) {
    throw error;
  }
};
