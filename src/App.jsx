import { useState, useEffect } from 'react';
import './App.css';
import { getData } from './Api';
import glossaryJson from './glossary.json';
import mindmap from './assets/map.png';

function App() {
  const [glossaryData, setGlossaryData] = useState([]);
  const [activeTab, setActiveTab] = useState('glossary');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    getData()
      .then((data) => {
        setGlossaryData(data.glossary);
      })
      .catch((err) => {
        console.log(err);
        setGlossaryData(glossaryJson.glossary);
      });
  }, []);
  return (
    <main className='main'>
      <h1 className='title'>Глоссарий</h1>
      <p className='subtitle'>Выполнил студент P4208 Чистяков Максим</p>
      <div className='tab-buttons'>
        <button
          onClick={() => handleTabChange('glossary')}
          className={activeTab === 'glossary' ? 'tab-button tab-button_active' : 'tab-button'}>
          Глоссарий
        </button>
        <button
          onClick={() => handleTabChange('mindmap')}
          className={activeTab === 'mindmap' ? 'tab-button tab-button_active' : 'tab-button'}>
          Mind Map
        </button>
      </div>
      {activeTab === 'glossary' && (
        <div className='container'>
          {glossaryData.map((item, index) => (
            <div key={index} className='card'>
              <h3 className='word'>{item.word.toUpperCase()}</h3>
              <p className='definition'>{item.definition}</p>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'mindmap' && <img className='mindmap' src={mindmap} alt='mindmap' />}
    </main>
  );
}

export default App;
