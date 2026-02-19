# Cadastro de Pacientes

Sistema completo de cadastro de pacientes desenvolvido com React, TypeScript e arquitetura em camadas. O projeto implementa um formulário robusto com validações em tempo real, máscaras automáticas e tratamento de erros, seguindo as melhores práticas de desenvolvimento.

---

## Sobre o Projeto

Sistema de telediagnóstico focado no cadastro de pacientes, desenvolvido para garantir a integridade dos dados através de validações rigorosas e uma experiência de usuário fluida. A aplicação utiliza arquitetura em camadas para separação de responsabilidades e facilitar manutenção.

---

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação e Execução

1. **Instalar as dependências**
```bash
npm install
```

2. **Iniciar o servidor backend** (Terminal 1)
```bash
npm run server
```
O servidor JSON será iniciado em `http://localhost:3001`

3. **Iniciar a aplicação React** (Terminal 2)
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`

4. **Acessar no navegador**
```
http://localhost:5173
```

> **Importante:** É necessário manter os dois terminais rodando simultaneamente (servidor JSON + aplicação React) para o funcionamento correto.

### Executar Testes

```bash
npm test              # Rodar testes no modo watch
npm run test:ui      # Rodar testes com interface visual
```

**Resultado esperado:** 6 testes passando

---

## Funcionalidades

### Campos do Formulário
- **Nome Completo**: Validação de nome e sobrenome obrigatórios
- **CPF**: Validação com algoritmo oficial e máscara automática (000.000.000-00)
- **Data de Nascimento**: Validação de data válida com máscara (DD/MM/AAAA)
- **E-mail**: Validação de formato de email

### Recursos Principais
- **Validação em Tempo Real**: Feedback imediato ao preencher os campos
- **Máscaras Automáticas**: Formatação automática de CPF e data
- **Validação de CPF**: Algoritmo oficial com verificação de dígitos
- **Validação de Data**: Verifica data válida e impede datas futuras
- **Validação de Duplicatas**: Impede cadastro de CPF ou e-mail já existentes
- **Feedback Visual**: Mensagens de erro e sucesso claras
- **Estado de Loading**: Indicador visual durante o salvamento
- **Persistência de Dados**: Armazenamento via JSON Server
- **TypeScript Strict**: Tipagem completa e segura
- **Testes Unitários**: Cobertura de cenários principais

---

## Validações e Funções

### Validação de CPF (`isValidCpf`)
Implementa o algoritmo oficial de validação de CPF:
- Verifica se possui 11 dígitos
- Rejeita sequências repetidas (111.111.111-11)
- Calcula e valida os dois dígitos verificadores
- Retorna `true` apenas para CPFs válidos

```typescript
isValidCpf("123.456.789-09") // true ou false
```

### Validação de E-mail (`isValidEmail`)
Valida formato de e-mail usando expressão regular:
- Verifica presença de @ e domínio
- Impede espaços em branco
- Garante formato básico válido

```typescript
isValidEmail("usuario@exemplo.com") // true
```

### Validação de Data (`isValidDate`)
Validação completa de data de nascimento:
- Verifica formato DD/MM/AAAA
- Valida dia, mês e ano válidos
- Verifica se a data existe no calendário (ex: 31/02 é inválido)
- Impede datas futuras (não se pode nascer no futuro)

```typescript
isValidDate("15/03/1990") // true ou false
```

### Máscaras de Formatação

**CPF (`formatCpf`)**
```typescript
formatCpf("12345678909") // "123.456.789-09"
```

**Data (`formatDate`)**
```typescript
formatDate("15031990") // "15/03/1990"
```

### Conversão de Data (`dateToIsoFormat`)
Converte data brasileira para formato ISO (banco de dados):
```typescript
dateToIsoFormat("15/03/1990") // "1990-03-15"
```

### Validação de Duplicatas
O sistema verifica automaticamente se já existe um paciente cadastrado com o mesmo CPF ou e-mail antes de salvar:

**Validação de CPF Duplicado**
- Compara CPF removendo formatação (pontos e traço)
- Mensagem de erro: "Paciente já cadastrado com este CPF"
- Erro exibido no campo CPF

**Validação de E-mail Duplicado**
- Comparação case-insensitive (ignora maiúsculas/minúsculas)
- Mensagem de erro: "Paciente já cadastrado com este e-mail"
- Erro exibido no campo e-mail

```typescript
// Exemplos de validação
createPatient({ cpf: "123.456.789-09", ... }) // Erro se CPF já existe
createPatient({ email: "teste@email.com", ... }) // Erro se e-mail já existe
```

---

## Estrutura do Projeto

### Arquitetura em Camadas

```
Screen (Orquestração)
   ↓
Feature (Hooks + Lógica de Negócio)
   ↓
Application (Serviços e API)
```

### Organização de Pastas

```
src/
├── application/
│   └── services/
│       └── patientService.ts      # Comunicação com API (fetch, create, delete)
│
├── features/
│   └── patient/
│       ├── components/
│       │   └── PatientForm.tsx    # Componente do formulário
│       ├── hooks/
│       │   ├── useCreatePatient.ts  # Lógica de criação e validação
│       │   └── usePatients.ts       # Hook para listagem
│       └── utils/
│           └── validation.ts        # Funções de validação e formatação
│
├── screens/
│   └── PatientRegistrationScreen.tsx  # Tela principal
│
├── components/
│   └── ui/                        # Componentes reutilizáveis
│       ├── button.tsx
│       ├── card.tsx
│       ├── form-field.tsx
│       ├── input.tsx
│       └── label.tsx
│
├── types/
│   └── patient.ts                 # Interfaces TypeScript
│
└── test/
    ├── PatientForm.test.tsx       # Testes automatizados
    └── setup.ts                   # Configuração do Vitest
```

### Descrição das Camadas

**1. Application Layer (`application/services`)**
- Responsável pela comunicação com APIs externas
- Funções: `fetchPatients()`, `createPatient()`, `deletePatient()`
- Configuração da URL base e headers HTTP

**2. Feature Layer (`features/patient`)**
- Contém a lógica de negócio específica de pacientes
- **Hooks**: Gerenciam estado e lógica (validação, submissão)
- **Components**: Componentes visuais do formulário
- **Utils**: Funções auxiliares de validação e formatação

**3. Screen Layer (`screens`)**
- Camada de apresentação e orquestração
- Integra features e define o layout da página

**4. Components UI (`components/ui`)**
- Componentes reutilizáveis de interface
- Baseados em Shadcn UI e Tailwind CSS

---

## Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática e segurança
- **Vite** - Build tool e dev server rápido
- **Tailwind CSS** - Estilização utilitária
- **Shadcn UI** - Componentes UI acessíveis
- **JSON Server** - Mock de API REST
- **Vitest** - Framework de testes
- **React Testing Library** - Testes de componentes
- **Lucide React** - Ícones

---

## Scripts Disponíveis

```bash
npm run dev        # Iniciar aplicação em modo desenvolvimento
npm run server     # Iniciar servidor JSON (porta 3001)
npm run build      # Gerar build de produção
npm run preview    # Visualizar build de produção
npm test           # Executar testes em modo watch
npm run test:ui    # Executar testes com interface gráfica
npm run lint       # Executar linter (ESLint)
```

---
