import api from './client';

export async function register(payload) {
  const { data } = await api.post('/register', payload);
  localStorage.setItem('token', data.token);
  return data.user;
}

export async function login(payload) {
  const { data } = await api.post('/login', payload);
  localStorage.setItem('token', data.token);
  return data.user;
}

export async function me() {
  const { data } = await api.get('/me');
  return data;
}

export async function logout() {
  await api.post('/logout');
  localStorage.removeItem('token');
}
