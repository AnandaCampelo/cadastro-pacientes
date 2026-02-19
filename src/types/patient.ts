export interface Patient {
  id: string;
  fullName: string;
  cpf: string;
  birthDate: string;
  email: string;
  createdAt: string;
}

export interface PatientFormData {
  fullName: string;
  cpf: string;
  birthDate: string;
  email: string;
}

export interface PatientFormErrors {
  fullName?: string;
  cpf?: string;
  birthDate?: string;
  email?: string;
}
