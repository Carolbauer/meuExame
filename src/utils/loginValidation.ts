export function validateLogin({ cpf, code }) {
    const errors = { cpf: "", code: "", auth: "" };
    let valid = true;
  
    if (!cpf.trim()) {
      errors.cpf = "O campo CPF é obrigatório.";
      valid = false;
    }
  
    if (!code.trim()) {
      errors.code = "O campo Código é obrigatório.";
      valid = false;
    }
  
    return { valid, errors };
  }
  