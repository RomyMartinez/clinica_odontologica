export const dataFormattedWithHour = (data: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return data.toLocaleTimeString("pt-BR", options);
};
