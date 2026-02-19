import type { Patient, PatientFormData } from "@/types/patient";

const API_BASE_URL = "http://localhost:3001";

export async function fetchPatients(): Promise<Patient[]> {
  const response = await fetch(`${API_BASE_URL}/patients`);
  
  if (!response.ok) {
    throw new Error("Erro ao carregar pacientes");
  }
  
  return response.json();
}

export async function createPatient(
  patientData: PatientFormData
): Promise<Patient> {
  const existingPatients = await fetchPatients();
  const cpfClean = patientData.cpf.replace(/\D/g, "");

  const duplicateCpf = existingPatients.find(
    (patient) => patient.cpf.replace(/\D/g, "") === cpfClean
  );

  if (duplicateCpf) {
    throw new Error("Paciente já cadastrado com este CPF");
  }

  const duplicateEmail = existingPatients.find(
    (patient) => patient.email.toLowerCase() === patientData.email.toLowerCase()
  );

  if (duplicateEmail) {
    throw new Error("Paciente já cadastrado com este e-mail");
  }

  const newPatient = {
    ...patientData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const response = await fetch(`${API_BASE_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPatient),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar paciente");
  }

  return response.json();
}

export async function deletePatient(patientId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar paciente");
  }
}
