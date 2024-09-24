import { useEffect, useState } from "react";

export default function Stats() {
  const [counterViniculas, setCounterViniculas] = useState(0);
  const [counterRotulos, setCounterRotulos] = useState(0);
  const [counterClientes, setCounterClientes] = useState(0);

  const limits = {
    viniculas: 50,
    rotulos: 1000,
    clientes: 10000,
  };

  useEffect(() => {
    const updateCounters = () => {
      setCounterViniculas((prevViniculas) => {
        if (prevViniculas < limits.viniculas) {
          return Math.min(prevViniculas + 1, limits.viniculas);
        }
        return prevViniculas;
      });

      setCounterRotulos((prevRotulos) => {
        if (prevRotulos < limits.rotulos) {
          return Math.min(prevRotulos + 20, limits.rotulos);
        }
        return prevRotulos;
      });

      setCounterClientes((prevClientes) => {
        if (prevClientes < limits.clientes) {
          return Math.min(prevClientes + 200, limits.clientes);
        }
        return prevClientes;
      });
    };

    const calculateInterval = () => {
      const viniculasProximity = counterViniculas - limits.viniculas;

      // As viniculasProximity decreases (closer to the limit), the interval decreases
      return 100 + 2 * viniculasProximity; // Starts faster and slows down near the limit
    };

    const interval = setInterval(updateCounters, calculateInterval());

    return () => clearInterval(interval);
  }, [counterViniculas, counterRotulos, counterClientes]);

  return (
    <div className="container mx-auto flex justify-center space-x-8 px-4 md:space-x-16">
      <div className="text-center">
        <h3 className="text-3xl font-bold">{counterViniculas}+</h3>
        <p className="text-gray-600">Vinícolas Selecionadas</p>
      </div>
      <div className="text-center">
        <h3 className="text-3xl font-bold">{counterRotulos}+</h3>
        <p className="text-gray-600">Rótulos exclusivos</p>
      </div>
      <div className="text-center">
        <h3 className="text-3xl font-bold">{counterClientes}+</h3>
        <p className="text-gray-600">Clientes Satisfeitos</p>
      </div>
    </div>
  );
}
