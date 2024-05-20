'use client'
import React, { useEffect, useState } from 'react';
import { getAllProdutos, createProduto, updateProduto, deleteProduto } from '../../services/storage';

interface Produto {
  id: number;
  codigo: string;
  nome: string;
  precoPor: number;
  precoDe: number;
  estoqueTotal: number;
  estoqueCorte: number;
}

const Products = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [produtoForm, setProdutoForm] = useState({ codigo: '', nome: '', precoPor: 0, precoDe: 0, estoqueTotal: 0, estoqueCorte: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const data = await getAllProdutos();
      setProdutos(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'nome' ? value : value === '' ? 0 : parseFloat(value);
    setProdutoForm({ ...produtoForm, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateProduto(editingId.toString(), produtoForm);
      setEditingId(null);
    } else {
      await createProduto(produtoForm);
    }
    setProdutoForm({ codigo: '', nome: '', precoPor: 0, precoDe: 0, estoqueTotal: 0, estoqueCorte: 0 });
    fetchProdutos();
  };

  const handleEdit = (produto: Produto) => {
    setProdutoForm(produto);
    setEditingId(produto.id);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded">
        <h1 className="text-lg font-bold mb-4">Lista de Produtos</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="text" name="codigo" placeholder="Código" value={produtoForm.codigo} onChange={handleFormChange} className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
          <input type="text" name="nome" placeholder="Nome" value={produtoForm.nome} onChange={handleFormChange} className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
          <input type="number" name="precoPor" placeholder="Preço Por" value={produtoForm.precoPor || ''} onChange={handleFormChange} className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
          <input type="number" name="precoDe" placeholder="Preço De" value={produtoForm.precoDe || ''} onChange={handleFormChange} className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
          <input type="number" name="estoqueTotal" placeholder="Estoque Total" value={produtoForm.estoqueTotal || ''} onChange={handleFormChange} className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
          <input type="number" name="estoqueCorte" placeholder="Estoque Corte" value={produtoForm.estoqueCorte || ''} onChange={handleFormChange} className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">{editingId ? 'Atualizar' : 'Criar'}</button>
        </form>
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id} className="mb-2">
              {produto.nome} - R$ {produto.precoPor}
              <button onClick={() => handleEdit(produto)} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Editar</button>
              <button onClick={() => deleteProduto(produto.id.toString())} className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Deletar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
