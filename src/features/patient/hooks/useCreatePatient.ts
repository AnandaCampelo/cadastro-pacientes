import { useState, useCallback } from "react";
import type { PatientFormData, PatientFormErrors } from "@/types/patient";
import {
  isValidCpf,
  isValidEmail,
  isValidDate,
  dateToIsoFormat,
} from "../utils/validation";
import { createPatient } from "@/application/services/patientService";

type ScreenState = 
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'error' };

export function useCreatePatient() {
  const [formData, setFormData] = useState<PatientFormData>({
    fullName: "",
    cpf: "",
    birthDate: "",
    email: "",
  });

  const [errors, setErrors] = useState<PatientFormErrors>({});
  const [screenState, setScreenState] = useState<ScreenState>({ type: 'idle' });

  const validateField = useCallback((fieldName: keyof PatientFormData, value: string): string | undefined => {
    switch (fieldName) {
      case "fullName":
        if (!value.trim()) {
          return "Nome completo é obrigatório";
        }
        if (value.trim().split(" ").length < 2) {
          return "Digite o nome completo";
        }
        return undefined;

      case "cpf":
        if (!value) {
          return "CPF é obrigatório";
        }
        if (!isValidCpf(value)) {
          return "CPF inválido";
        }
        return undefined;

      case "birthDate":
        if (!value) {
          return "Data de nascimento é obrigatória";
        }
        if (!isValidDate(value)) {
          return "Data inválida";
        }
        return undefined;

      case "email":
        if (!value) {
          return "E-mail é obrigatório";
        }
        if (!isValidEmail(value)) {
          return "E-mail inválido";
        }
        return undefined;

      default:
        return undefined;
    }
  }, []);

  const validateAllFields = useCallback((): boolean => {
    const newErrors: PatientFormErrors = {
      fullName: validateField("fullName", formData.fullName),
      cpf: validateField("cpf", formData.cpf),
      birthDate: validateField("birthDate", formData.birthDate),
      email: validateField("email", formData.email),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== undefined);
  }, [formData, validateField]);

  const submitPatient = useCallback(async () => {
    setScreenState({ type: 'idle' });

    if (!validateAllFields()) {
      return;
    }

    setScreenState({ type: 'submitting' });

    try {
      const patientDataToSave = {
        ...formData,
        birthDate: dateToIsoFormat(formData.birthDate),
      };

      await createPatient(patientDataToSave);

      setScreenState({ type: 'success', message: 'Paciente cadastrado com sucesso!' });
      setFormData({
        fullName: "",
        cpf: "",
        birthDate: "",
        email: "",
      });
      setErrors({});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao cadastrar paciente";
      
      setScreenState({ type: 'error' });
      
      if (errorMessage.includes("CPF")) {
        setErrors((prev) => ({
          ...prev,
          cpf: errorMessage,
        }));
      } else if (errorMessage.includes("e-mail")) {
        setErrors((prev) => ({
          ...prev,
          email: errorMessage,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: errorMessage,
        }));
      }
    }
  }, [formData, validateAllFields]);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    screenState,
    setScreenState,
    validateField,
    submitPatient,
  };
}
