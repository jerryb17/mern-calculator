import { useContext } from 'react';
import { CalcuContext } from '../context/CalcuContext';
import { Textfit } from 'react-textfit';

const Screen = () => {
  const { calc } = useContext(CalcuContext);

  return (
    <Textfit className="screen" max={70} mode="single">
      {calc.res ? calc.res : ''}
      {calc.sign && ` ${calc.sign}`}
      {calc.num ? ` ${calc.num}` : ''}
    </Textfit>
  );
};

export default Screen;
