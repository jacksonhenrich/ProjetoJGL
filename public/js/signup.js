import API from "./api.js";

function loadSubmitHandler() {
  const form = document.querySelector("form");

  form.onsubmit = async function (event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;

    const senha = document.querySelector("#senha").value;

    const estado = document.querySelector("#estado").value;

    const tipoResidencia = document.querySelector("#tipoResidencia").value;

    const enderecoFisico = document.querySelector("#enderecoFisico").value;

    const cidade = document.querySelector("#cidade").value;

    const cep = document.querySelector("#cep").value;

    const user = { email, senha, enderecoFisico, estado, tipoResidencia, cidade, cep };


    await API.create(user);

    // createUserView(newUser);

    form.reset();

  };
}

loadSubmitHandler();
