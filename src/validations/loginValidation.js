export function validateLogin({ cpf, codigo }) {
    const errors = { cpf: "", codigo: "", auth: "" };
    let valid = true;
  
    if (!cpf.trim()) {
      errors.cpf = "O campo CPF é obrigatório.";
      valid = false;
    }
  
    if (!codigo.trim()) {
      errors.codigo = "O campo Código é obrigatório.";
      valid = false;
    }
  
    return { valid, errors };
  }
  