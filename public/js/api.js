async function create(user) {
  const res = await fetch('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const response = await res.json();

  // Verifica se a resposta foi bem sucedida
  if (res.status >= 400 && res.status < 600) {
    throw new Error(response.message);
  }
  // Retorna mensagem de sucesso
  alert(response.message);

  // Redireciona para a página de login
  window.location.href = 'index.html';


}

async function read() {
  const res = await fetch('/wifis', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const wifis = await res.json();

  return wifis;
}

async function readById(path, ssid) {
  const res = await fetch(`${server}${path}/${ssid}`);

  return await res.json();
}

async function update(path, wifi, ssid) {
  const res = await fetch(`${server}${path}/${ssid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wifi),
  });

  return await res.json();
}

async function remove(path, ssid) {
  const res = await fetch(`${server}${path}/${ssid}`, {
    method: 'DELETE',
  });

  return await res.json();
}

export default {
  create,
  read,
  readById,
  update,
  remove,
};
