import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PatientForm } from '@/features/patient/components/PatientForm';

describe('PatientForm', () => {
  it('deve exibir mensagens de erro quando tentar salvar com campos vazios', async () => {
    render(<PatientForm />);

    const saveButton = screen.getByRole('button', { name: /salvar/i });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Nome completo é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('CPF é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Data de nascimento é obrigatória')).toBeInTheDocument();
      expect(screen.getByText('E-mail é obrigatório')).toBeInTheDocument();
    });
  });

  it('deve validar CPF inválido', async () => {
    render(<PatientForm />);

    const cpfInput = screen.getByLabelText(/cpf/i);

    fireEvent.change(cpfInput, { target: { value: '123.456.789-00' } });
    fireEvent.blur(cpfInput);

    await waitFor(() => {
      expect(screen.getByText('CPF inválido')).toBeInTheDocument();
    });
  });

  it('deve validar e-mail inválido', async () => {
    render(<PatientForm />);

    const emailInput = screen.getByLabelText(/e-mail/i);

    fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
    });
  });

  it('deve validar nome completo', async () => {
    render(<PatientForm />);

    const nameInput = screen.getByLabelText(/nome completo/i);

    fireEvent.change(nameInput, { target: { value: 'João' } });
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(screen.getByText('Digite o nome completo')).toBeInTheDocument();
    });
  });

  it('deve aplicar máscara no CPF', () => {
    render(<PatientForm />);

    const cpfInput = screen.getByLabelText(/cpf/i) as HTMLInputElement;

    fireEvent.change(cpfInput, { target: { value: '12345678900' } });

    expect(cpfInput.value).toBe('123.456.789-00');
  });

  it('deve aplicar máscara na data', () => {
    render(<PatientForm />);

    const dateInput = screen.getByLabelText(/data de nascimento/i) as HTMLInputElement;

    fireEvent.change(dateInput, { target: { value: '01012000' } });

    expect(dateInput.value).toBe('01/01/2000');
  });
});
