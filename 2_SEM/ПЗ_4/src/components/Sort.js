import { useState } from 'react';

const Sort = (props) => {
  const [lastResetTrigger, setLastResetTrigger] = useState(props.resetTrigger)
  const baseOptions = props.headers.map((header, index) => ({ 
    value: index, 
    label: header 
  }));

  const [sortFields, setSortFields] = useState([
    { column: '', order: false },
    { column: '', order: false },
    { column: '', order: false }
  ]);

  const [availableOptions, setAvailableOptions] = useState([
    baseOptions,
    baseOptions,
    baseOptions
  ]);
  ;

  if (props.resetTrigger !== lastResetTrigger) {
    setLastResetTrigger(props.resetTrigger);
    
    setSortFields([
      { column: '', order: false },
      { column: '', order: false },
      { column: '', order: false }
    ]);
    
    const newBaseOptions = props.headers.map((header, idx) => ({ 
      value: idx, 
      label: header 
    }));
    setAvailableOptions([
      newBaseOptions,
      newBaseOptions,
      newBaseOptions
    ]);
    
    props.onSort(props.data);
  }

  const updateAvailableOptions = (changedIndex) => {
    const newAvailableOptions = [...availableOptions];
    
    for (let i = 0; i < sortFields.length; i++) {
      if (i === changedIndex) {
        const selectedInOthers = sortFields
          .filter((_, idx) => idx !== i && sortFields[idx].column !== '')
          .map(f => f.column);
        
        newAvailableOptions[i] = baseOptions.filter(
          opt => !selectedInOthers.includes(opt.value) || opt.value === sortFields[i].column
        );
      } else if (i > changedIndex) {
        newAvailableOptions[i] = baseOptions;
      }
    }
    
    setAvailableOptions(newAvailableOptions);
  };

  const handleFieldChange = (index, value) => {
    const newSortFields = [...sortFields];
    newSortFields[index].column = value === '' ? '' : parseInt(value);
    
    for (let i = index + 1; i < newSortFields.length; i++) {
      newSortFields[i].column = '';
      newSortFields[i].order = false;
    }
    
    setSortFields(newSortFields);
    updateAvailableOptions(index);
  };

  const handleOrderChange = (index, checked) => {
    const newSortFields = [...sortFields];
    newSortFields[index].order = checked;
    setSortFields(newSortFields);
  };

  const handleSort = () => {
    const sortConfig = sortFields
      .filter(field => field.column !== '')
      .map(field => ({
        column: field.column,
        direction: field.order
      }));
    
    if (sortConfig.length === 0) {
      props.onSort(props.data);
      return;
    }
    
    const sortedData = [...props.data].sort((a, b) => {
      for (let { column, direction } of sortConfig) {
        const key = props.headers[column];
        
        let aVal = a[key];
        let bVal = b[key];
        
        let comparison;
        
        if (key === 'Год' || key === 'Рейтинг' || key === 'Возраст') {
          const aNum = parseFloat(aVal) || 0;
          const bNum = parseFloat(bVal) || 0;
          
          if (aNum > bNum) comparison = 1;
          else if (aNum < bNum) comparison = -1;
          else comparison = 0;
        } else {
          comparison = String(aVal).localeCompare(String(bVal));
        }
        
        if (comparison !== 0) {
          return direction ? -comparison : comparison;
        }
      }
      return 0;
    });
    
    props.onSort(sortedData);
  };

  const handleReset = () => {
    setSortFields([
      { column: '', order: false },
      { column: '', order: false },
      { column: '', order: false }
    ]);
    
    const newBaseOptions = props.headers.map((header, idx) => ({ 
      value: idx, 
      label: header 
    }));
    setAvailableOptions([
      newBaseOptions,
      newBaseOptions,
      newBaseOptions
    ]);
    
    props.onSort(props.data);
  };

  return (
    <div className="sort">
      
      <div className="sorti">
        <p>Сортировать по</p>
        <select
          value={sortFields[0].column}
          onChange={(e) => handleFieldChange(0, e.target.value)}
        >
          <option value="">Нет</option>
          {availableOptions[0]?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            checked={sortFields[0].order}
            onChange={(e) => handleOrderChange(0, e.target.checked)}
            disabled={sortFields[0].column === ''}
          />
          по убыванию
        </label>
      </div>
      
      <div className="sorti">
        <select
          value={sortFields[1].column}
          onChange={(e) => handleFieldChange(1, e.target.value)}
          disabled={sortFields[0].column === ''}
        >
          <option value="">Нет</option>
          {availableOptions[1]?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            checked={sortFields[1].order}
            onChange={(e) => handleOrderChange(1, e.target.checked)}
            disabled={sortFields[1].column === ''}
          />
          по убыванию
        </label>
      </div>
      
      <div className="sorti">
        <select
          value={sortFields[2].column}
          onChange={(e) => handleFieldChange(2, e.target.value)}
          disabled={sortFields[1].column === ''}
        >
          <option value="">Нет</option>
          {availableOptions[2]?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            checked={sortFields[2].order}
            onChange={(e) => handleOrderChange(2, e.target.checked)}
            disabled={sortFields[2].column === ''}
          />
          по убыванию
        </label>
      </div>
      
      <div className="sort-buttons">
        <button onClick={handleSort}>Сортировать</button>
        <button onClick={handleReset}>Сбросить сортировку</button>
      </div>
    </div>
  );
};

export default Sort;