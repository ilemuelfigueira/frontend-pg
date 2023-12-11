const mascaraTelefone = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

const mascaraCep = (value) => {
  if (!value) return "";
  value = value.replace(/\D/, "")
  value = value.replace(/(\d)(\d{3})$/, "$1-$2");

  return value;
};

const mascaraDDMMYYYY = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d{2})(\d{2,4})$/, "$1/$2/$3")
  return value;
};

const mascaraCpf = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return value;
};

function aplicarMascara(value, tipo) {
  switch (tipo) {
    case "telefone":
      return mascaraTelefone(value);
    case "cep":
      return mascaraCep(value);
    case "ddmmyyyy":
      return mascaraDDMMYYYY(value);
    case "cpf":
      return mascaraCpf(value);
    default:
      return value;
  }
}

export { aplicarMascara }