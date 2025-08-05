export const dataFormatted = (data: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  return data.toLocaleDateString("pt-BR", options);
};
