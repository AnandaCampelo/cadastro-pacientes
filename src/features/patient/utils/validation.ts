export function isValidCpf(cpf: string): boolean {
  const cleanCpf = cpf.replace(/\D/g, "");
  
  if (cleanCpf.length !== 11) {
    return false;
  }
  
  if (/^(\d)\1+$/.test(cleanCpf)) {
    return false;
  }
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCpf.charAt(9))) {
    return false;
  }
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCpf.charAt(10))) {
    return false;
  }
  
  return true;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidDate(dateString: string): boolean {
  const cleanDate = dateString.replace(/\D/g, "");
  
  if (cleanDate.length !== 8) {
    return false;
  }
  
  const day = parseInt(cleanDate.substring(0, 2));
  const month = parseInt(cleanDate.substring(2, 4));
  const year = parseInt(cleanDate.substring(4, 8));
  
  if (month < 1 || month > 12) {
    return false;
  }
  
  if (day < 1 || day > 31) {
    return false;
  }
  
  const date = new Date(year, month - 1, day);
  
  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return false;
  }
  
  const today = new Date();
  if (date > today) {
    return false;
  }
  
  return true;
}

export function formatCpf(cpf: string): string {
  const cleanCpf = cpf.replace(/\D/g, "");
  return cleanCpf
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatDate(date: string): string {
  const cleanDate = date.replace(/\D/g, "");
  return cleanDate
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4}).*/, "$1");
}

export function dateToIsoFormat(dateString: string): string {
  const cleanDate = dateString.replace(/\D/g, "");
  const day = cleanDate.substring(0, 2);
  const month = cleanDate.substring(2, 4);
  const year = cleanDate.substring(4, 8);
  return `${year}-${month}-${day}`;
}
