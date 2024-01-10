import { useState, useEffect } from 'react';
import './App.css';
import { getData } from './Api';
import glossaryJson from './glossary.json';

function App() {
  const [glossaryData, setGlossaryData] = useState([]);
  useEffect(() => {
    getData()
      .then((data) => {
        setGlossaryData(data.glossary);
      })
      .catch((err) => {
        console.log(err);
        setGlossaryData(glossaryJson.glossary);
      });
  });
  return (
    <main className="main">
      <h1 className="title">Глоссарий</h1>
      <p className="subtitle">Выполнил студент P4208 Чистяков Максим</p>
      <div className="container">
        {glossaryData.map((item, index) => (
          <div key={index} className="card">
            <h3 className="word">{item.word.toUpperCase()}</h3>
            <p className="definition">{item.definition}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
