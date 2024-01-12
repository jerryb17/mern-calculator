import React, { useContext } from 'react';
import axios from 'axios';
import { CalcuContext } from '../context/CalcuContext';
//to assign className according to there sign
const getStyleName = (btn) => {
  const className = {
    '=': 'equals',
    '*': 'opt',
    '-': 'opt',
    '+': 'opt',
    AC: 'opt',
    DEL: 'opt',
    '/': 'opt',
    0: 'zero',
  };
  return className[btn];
};

const Button = ({ value }) => {
  const { calc, setCalc, history, setHistory } = useContext(CalcuContext);

  // User click dot
  const dotClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
    });
  };
  // User click AC
  const resetClick = () => {
    setCalc({ sign: '', num: 0, res: 0 });
  };
  // User click ops
  const handleSignClick = () => {
    if (calc.num) {
      setCalc({
        ...calc,
        res: calc.num,
        num: '',
        sign: value,
      });
    } else {
      setCalc({
        ...calc,
        sign: value,
      });
    }
  };

  // User click number + ops
  const handleClickButton = () => {
    if (['+', '-', '*', '/'].includes(value)) {
      handleSignClick();
    } else {
      const numberString = value.toString();

      let numberValue;
      if (numberString === '0' && calc.num === 0) {
        numberValue = '0';
      } else {
        // Check result already present
        if (calc.res !== 0) {
          // If, reset the calculator's state
          setCalc({ sign: '', num: 0, res: 0 });
        }
        numberValue = Number(calc.num + numberString);
      }

      setCalc({
        ...calc,
        num: numberValue,
      });
    }
  };

  // User click operations
  const signClick = () => {
    setCalc({
      sign: value,
      res: calc.num || calc.res,
      num: 0,
    });
  };

  // User click equals
  const equalsClick = async () => {
    if (calc.sign) {
      if (calc.res && calc.num) {
        const math = (a, b, sign) => {
          const result = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b,
          };
          return result[sign](a, b);
        };
        const result = math(Number(calc.res), Number(calc.num), calc.sign);
        await setCalc({
          res: result,
          sign: '',
          num: 0,
        });

        // Send a request to the backend
        const { data } = await axios.post(
          'http://localhost:5000/api/calculate',
          {
            num1: calc.res,
            num2: calc.num,
            operator: calc.sign,
          }
        );
        setHistory([...history, data]);
      }
    } else {
      setCalc({ sign: '', num: 0, res: 0 });
    }
  };
  // User click DEL
  const deleteClick = () => {
    if (calc.res && !calc.num) {
      let number = calc.res.toString().slice(0, -1);
      let numberValue = number === '' ? 0 : Number(number);
      setCalc({
        ...calc,
        res: numberValue,
      });
    } else {
      let number = calc.num.toString().slice(0, -1);
      let numberValue = number === '' ? 0 : Number(number);
      setCalc({
        ...calc,
        num: numberValue,
      });
    }
  };

  const handleBtnClick = () => {
    const results = {
      '.': dotClick,
      AC: resetClick,
      DEL: deleteClick,
      '/': signClick,
      '*': signClick,
      '-': signClick,
      '+': signClick,
      '=': equalsClick,
    };
    if (results[value]) {
      return results[value]();
    } else {
      return handleClickButton();
    }
  };

  return (
    <>
      <button
        onClick={handleBtnClick}
        className={`${getStyleName(value)} button`}
      >
        {value}
      </button>
    </>
  );
};

export default Button;
