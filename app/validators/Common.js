export const getError = (error, field) => {
  if (!error) return;
  return {
    validateStatus: "error",
    help: `${field}${error.details[0].message.slice(
      error.details[0].message.lastIndexOf('"') + 1
    )}`
  };
};
