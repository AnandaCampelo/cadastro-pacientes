# Aplicação: Cadastro de Pacientes

Neste desafio, você irá aplicar os conhecimentos de interface e lógica básica em um cenário real de Telemedicina.

## História de Usuário

**Como** atendente de uma clínica de telediagnóstico,
**Quero** cadastrar novos pacientes no sistema informando seus dados básicos,
**Para que** o médico possa ter acesso ao histórico e realizar o laudo dos exames corretamente.

---

## Contexto do Projeto

Você deve desenvolver um módulo de **Cadastro de Pacientes** para um sistema de **Telediagnóstico**. O foco é a criação
de formulários, validação de dados e a organização rigorosa do código seguindo a arquitetura de camadas da equipe.

## Recomendações Iniciais

1. **Crie um repositório pessoal** no GitHub ou GitLab para este projeto.
2. O projeto deve ser **iniciado do zero**. Utilize os comandos recomendados na documentação oficial
   do [React](https://react.dev/learn/start-a-new-react-project).
3. Utilize a biblioteca de componentes [Shadcn UI](https://ui.shadcn.com/) para a construção da interface.
4. Siga rigorosamente os padrões de [Nomenclatura](https://wiki.ptmdev.com.br/pt-br/Chapters/Front/CodeStyle/FunctionsName)


---

## Requisitos Detalhados

### 1. Interface e Formulários

- **Setup:** O projeto deve ser criado utilizando os comandos oficiais do [React](https://react.dev/) e configurado
  com [Shadcn UI](https://ui.shadcn.com/).
- **Campos do Formulário:** O formulário deve conter os campos: Nome Completo, CPF, Data de Nascimento e E-mail.
- **Recomendações de UI/UX:**
    - **Layout:** Utilize um `Card` centralizado para o formulário.
    - **Inputs:** Utilize labels claras e placeholders exemplificativos (ex: "João Silva", "000.000.000-00").
    - **Validações em Tempo Real:** Os campos devem mostrar erro assim que o usuário perder o foco (*onBlur*) ou ao tentar submeter.
    - **Máscaras:** É altamente recomendável o uso de máscaras para CPF (999.999.999-99) e Data de Nascimento (DD/MM/AAAA).
- **Feedback Visual:** Implemente estados de loading ao clicar em "Salvar" e exiba uma mensagem de sucesso ou erro (pode
  ser um Toast ou uma Label colorida).
- **Design System:** Utilize componentes reutilizáveis para Botões e Inputs. Garanta que o estado de erro (borda
  vermelha) apareça se o campo estiver inválido.

### 2. Lógica e React Core

- **Servidor de Mock:** Configure o [JSON Server](https://www.npmjs.com/package/json-server) para gerenciar os dados dos
  pacientes.
- **Gerenciamento de Estado:** Utilize `useState` para controlar os valores do formulário (preferencialmente um objeto
  único de estado).
- **Efeitos:** Utilize `useEffect` para carregar a lista inicial de pacientes vinda do servidor de mock.
- **Componentização:** Todos os componentes devem ser declarados com a sintaxe `function Name() { ... }`. **Não
  utilize `const Name = () => ...`**.

### 3. Arquitetura (O ponto mais importante)

Você deve seguir a Hierarquia de Camadas do projeto:

- **Camada Screen:** Apenas orquestra os componentes e chama os hooks de lógica. Não deve haver funções de "submit" ou "
  fetch" aqui.
- **Camada Feature:** Crie um custom hook (ex: `useCreatePatient`) que contém a lógica de estado do formulário e as
  validações.
- **Camada Application:** Crie uma função assíncrona que simula o salvamento no banco de dados (pode ser um
  `setTimeout`).

### 4. Qualidade e Testes

- **TypeScript:** Crie um arquivo de tipos/interfaces para o `Patient`.
- **Exemplo de Contrato:**
  ```typescript
  export interface Patient {
    id: string;
    fullName: string;
    cpf: string;
    birthDate: string; // ISO String ou formato YYYY-MM-DD
    email: string;
    createdAt: string;
  }
  ```
- **Testes Unitários:** Crie pelo menos um teste usando **React Testing Library (RTL)** que verifique se, ao clicar no
  botão de salvar com campos vazios, o formulário não é enviado ou as mensagens de erro aparecem.

---

## O que será avaliado

- **Sintaxe de Funções:** O uso de arrow functions para componentes React causará reprovação.
- **Vazamento de Camadas:** Se houver lógica de API ou validações pesadas dentro do arquivo da Screen (JSX), o desafio
  será invalidado.
- **Clean Code:** Funções muito grandes (mais de 30 linhas) devem ser refatoradas.
- **Nomenclatura:** Nomes de variáveis como `info`, `data`, `obj` são proibidos. Use nomes semânticos como
  `patientData`, `isSaving`, etc.
