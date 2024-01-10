import { createContext, useState } from 'react';

export const CalcuContext = createContext();
const CalcuProvider = ({ children }) => {
  const [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0,
  });
  const [history, setHistory] = useState([]);

  const providerValue = {
    calc,
    setCalc,
    history,
    setHistory,
  };

  return (
    <CalcuContext.Provider value={providerValue}>
      {children}
    </CalcuContext.Provider>
  );
};

export default CalcuProvider;
