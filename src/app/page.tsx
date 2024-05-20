'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthenticated } from '../services/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/products');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      router.push('/products'); 
    } else {
      setError('Falha ao entrar. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded">
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}


export default Login;