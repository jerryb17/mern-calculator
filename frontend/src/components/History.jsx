import React, { useContext } from 'react';
import { CalcuContext } from '../context/CalcuContext';

const History = () => {
  const { history } = useContext(CalcuContext);

  return (
    <div>
      <div className="history">
        <h4>History:</h4>
        {history.map((item, index) => (
          <p key={index}>
            {item.expression} = {item.result}
          </p>
        ))}
      </div>
    </div>
  );
};

export default History;
