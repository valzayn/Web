import React, { useState, useEffect } from 'react';

const Task = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalTime, setIntervalTime] = useState(1000);

  const poem = [
  'Ночь, улица, фонарь, аптека,',
  'Бессмысленный и тусклый свет.',
  'Живи еще хоть четверть века -',
  'Все будет так. Исхода нет.',
  'Умрёшь — начнёшь опять сначала',
  'И повторится всё, как встарь:',
  'Ночь, ледяная рябь канала,',
  'Аптека, улица, фонарь.'
];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % poem.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime, poem.length]);

  const handleIntervalChange = (e) => {
    setIntervalTime(Number(e.target.value));
  };

  return (
    <div>
      <div>
        <label>
          Интервал: 
          <input 
            type="number" 
            value={intervalTime} 
            onChange={handleIntervalChange}
            min="0"
          />
        </label>
      </div>
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        fontSize: '18px',
        maxWidth: '300px',
        background: 'black',
        color: 'white'
      }}>
        {poem[currentIndex]}
      </div>
    </div>
  );
};

export default Task;