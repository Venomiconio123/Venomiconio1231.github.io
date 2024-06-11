import React, { useState, useEffect } from 'react';
import './style.css'; // Подключаем стили

const App: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [energyLevel, setEnergyLevel] = useState<number>(100);
  const [telegramId, setTelegramId] = useState('');
  const [refId, setRefId] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);

  const maxClicks = 100;

  const handleClick = () => {
    if (score < maxClicks) {
      setScore(score + 1);
    } else {
      window.location.href = "./limit/limit.html";
    }

    if (energyLevel > 0) {
      setEnergyLevel(energyLevel - 1);
    }
  };

  const handleTabClick = (target: string) => {
    window.location.href = target + ".html";
  };

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
    <div className="container">
      <div className="inner">
        <div className="item">
          <div className="btn-wrapper">
            <button className="btn" onClick={handleClick}></button>
          </div>
        </div>
      </div>

      <div className="score-container">
        <p className="score">{score}</p>
      </div>

      <div className="usercard">
        {/* Добавьте содержимое карточки пользователя, если это необходимо */}
      </div>

      <div className="health-label">Health</div>

      <div className="energy-bar">
        <div className="energy-level" style={{ width: `${energyLevel}%` }}></div>
      </div>

      <div className="tabs">
        <button className="tab" onClick={() => handleTabClick("index")}></button>
        <button className="tab" onClick={() => handleTabClick("menu2")}></button>
        <button className="tab" onClick={() => handleTabClick("menu3")}></button>
        <button className="tab" onClick={() => handleTabClick("menu4")}></button>
      </div>

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
    </div>
  );
};

export default App;
