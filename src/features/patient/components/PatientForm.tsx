import * as React from "react";
import { useCreatePatient } from "../hooks/useCreatePatient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { formatCpf, formatDate } from "../utils/validation";
import { Loader2 } from "lucide-react";

function PatientForm() {
  const {
    formData,
    errors,
    isLoading,
    successMessage,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
  } = useCreatePatient();

  function handleCpfChange(value: string) {
    const formatted = formatCpf(value);
    handleFieldChange("cpf", formatted);
  }

  function handleDateChange(value: string) {
    const formatted = formatDate(value);
    handleFieldChange("birthDate", formatted);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    handleSubmit();
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cadastro de Pacientes</CardTitle>
        <CardDescription>
          Preencha os dados do paciente para realizar o cadastro
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            id="fullName"
            label="Nome Completo"
            placeholder="João Silva"
            value={formData.fullName}
            onChange={(e) => handleFieldChange("fullName", e.target.value)}
            onBlur={() => handleFieldBlur("fullName")}
            error={errors.fullName}
            disabled={isLoading}
          />

          <FormField
            id="cpf"
            label="CPF"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => handleCpfChange(e.target.value)}
            onBlur={() => handleFieldBlur("cpf")}
            error={errors.cpf}
            maxLength={14}
            disabled={isLoading}
          />

          <FormField
            id="birthDate"
            label="Data de Nascimento"
            placeholder="DD/MM/AAAA"
            value={formData.birthDate}
            onChange={(e) => handleDateChange(e.target.value)}
            onBlur={() => handleFieldBlur("birthDate")}
            error={errors.birthDate}
            maxLength={10}
            disabled={isLoading}
          />

          <FormField
            id="email"
            label="E-mail"
            type="email"
            placeholder="joao.silva@exemplo.com"
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            onBlur={() => handleFieldBlur("email")}
            error={errors.email}
            disabled={isLoading}
          />

          {successMessage && (
            <div className="p-3 rounded-md bg-green-50 border border-green-200">
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export { PatientForm };
