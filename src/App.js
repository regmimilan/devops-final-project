import React from 'react';
import './App.css'; // Import CSS for styling

const contributors = [
  { name: 'Milan Regmii' },
  { name: 'Sujal Shrestha' },
  { name: 'Arun Wosti' },
  { name: 'Srijesh Khanal' },
];

const App = () => {
  return (
    <div className="app">
      {/* Header section */}
      <header className="header">
        <h1>Welcome to DevOps Final Project1</h1>
      </header>

      {/* Main content section */}
      <main className="main">
        <div className="contributors">
          <h2>Contributors of This Project are:</h2>
          <ul>
            {contributors.map((contributor, index) => (
              <li key={index}>{contributor.name}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default App;
