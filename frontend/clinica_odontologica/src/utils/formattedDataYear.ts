export const formattedDataYear = (data: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return data.toLocaleDateString("pt-BR", options);
};
