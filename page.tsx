"use client"

import { useState, useEffect } from 'react';
import { IUser } from './types/types';

export default function Home() {
  const [telegramId, setTelegramId] = useState('');
  const [refId, setRefId] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/addUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramId, refId }),
    });

    if (response.ok) {
      alert('User added successfully!');
      loadUsers();
    } else {
      alert('Failed to add user.');
    }
  };

  const loadUsers = async () => {
    const response = await fetch('/api/getUsers');
    const users = await response.json();
    setUsers(users);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1>MongoDB Atlas with Next.js</h1>
      <form onSubmit={addUser}>
        <input
          type="number"
          placeholder="telegramId"
          value={telegramId}
          onChange={(e) => setTelegramId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="refId"
          value={refId}
          onChange={(e) => setRefId(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.telegramId}>
            {user.telegramId} - {user.refererId}
          </li>
        ))}
      </ul>
    </div>
  );
}
