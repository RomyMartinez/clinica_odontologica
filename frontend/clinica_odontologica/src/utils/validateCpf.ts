export function validateCpf(cpf: string): boolean {
  const cleanCpf = cpf.replace(/\D/g, "");

  if (cleanCpf.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cleanCpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  let firstDigit = remainder < 10 ? remainder : 0;

  if (parseInt(cleanCpf.charAt(9)) !== firstDigit) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  let secondDigit = remainder < 10 ? remainder : 0;

  if (parseInt(cleanCpf.charAt(10)) !== secondDigit) return false;

  return true;
}

export function formatCpf(cpf: string): string {
  if (!validateCpf(cpf)) return "";

  const cleanCpf = cpf.replace(/\D/g, "");
  return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function unformatCpf(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

export function isValidCpfFormat(cpf: string): boolean {
  const cpfRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;
  return cpfRegex.test(cpf);
}
