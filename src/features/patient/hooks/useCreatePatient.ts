import { useState } from "react";
import type { PatientFormData, PatientFormErrors } from "@/types/patient";
import {
  isValidCpf,
  isValidEmail,
  isValidDate,
  dateToIsoFormat,
} from "../utils/validation";
import { createPatient } from "@/application/services/patientService";

export function useCreatePatient() {
  const [formData, setFormData] = useState<PatientFormData>({
    fullName: "",
    cpf: "",
    birthDate: "",
    email: "",
  });

  const [errors, setErrors] = useState<PatientFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function validateField(fieldName: keyof PatientFormData, value: string): string | undefined {
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
  }

  function handleFieldChange(fieldName: keyof PatientFormData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [fieldName]: undefined,
    }));

    setSuccessMessage("");
  }

  function handleFieldBlur(fieldName: keyof PatientFormData) {
    const error = validateField(fieldName, formData[fieldName]);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  }

  function validateAllFields(): boolean {
    const newErrors: PatientFormErrors = {
      fullName: validateField("fullName", formData.fullName),
      cpf: validateField("cpf", formData.cpf),
      birthDate: validateField("birthDate", formData.birthDate),
      email: validateField("email", formData.email),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== undefined);
  }

  async function handleSubmit() {
    setSuccessMessage("");

    if (!validateAllFields()) {
      return;
    }

    setIsLoading(true);

    try {
      const patientDataToSave = {
        ...formData,
        birthDate: dateToIsoFormat(formData.birthDate),
      };

      await createPatient(patientDataToSave);

      setSuccessMessage("Paciente cadastrado com sucesso!");
      setFormData({
        fullName: "",
        cpf: "",
        birthDate: "",
        email: "",
      });
      setErrors({});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao cadastrar paciente";
      
      if (errorMessage.includes("CPF")) {
        setErrors({
          ...errors,
          cpf: errorMessage,
        });
      } else if (errorMessage.includes("e-mail")) {
        setErrors({
          ...errors,
          email: errorMessage,
        });
      } else {
        setErrors({
          ...errors,
          email: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    formData,
    errors,
    isLoading,
    successMessage,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
  };
}
