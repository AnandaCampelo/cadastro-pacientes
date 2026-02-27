export type Gender = "Unknown" | "Male" | "Female" | "Other";

export interface PatientMe {
  first_name: string;
  last_name: string;
  cpf: string;
  cns?: string;
  phone?: string;
  mothers_name?: string;
  gender: Gender;
  date_birth?: string;
  national_health_card?: string;
  country_id?: string;
  state_id?: string;
  city?: string;
  zip_code?: string;
  address?: string;
  street?: string;
  district?: string;
  number?: string;
  complement?: string;
  tag?: string;
}
