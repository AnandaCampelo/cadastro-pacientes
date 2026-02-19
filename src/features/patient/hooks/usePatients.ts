import { useState, useEffect } from "react";
import type { Patient } from "@/types/patient";
import { fetchPatients } from "@/application/services/patientService";

export function usePatients() {
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadPatients() {
    setIsLoadingList(true);
    setErrorMessage("");

    try {
      const patients = await fetchPatients();
      setPatientsList(patients);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao carregar pacientes"
      );
    } finally {
      setIsLoadingList(false);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  return {
    patientsList,
    isLoadingList,
    errorMessage,
    reloadPatients: loadPatients,
  };
}
