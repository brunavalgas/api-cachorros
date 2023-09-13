import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/gustavoalves0123/api/main/api.json')
      .then(response => response.json())
      .then(data => {
        setDogs(data);
        setFilteredDogs(data.cachorros);
      });
  }, []);

  const filterDogs = porte => {
    if (porte === 'todos') {
      setFilteredDogs(dogs);
    } else {
      const filtered = dogs.filter(dog => dog.porte === porte);
      setFilteredDogs(filtered);
    }
    setFilter(porte);
  };

  return (
    <div className="App">
      <h1>Filtrar Cachorros por Porte</h1>
      <div>
        <button onClick={() => filterDogs('todos')} className="teste todos">Todos</button>
        <button onClick={() => filterDogs('Pequeno')} className="teste pequeno">Porte Pequeno</button>
        <button onClick={() => filterDogs('Médio')} className="teste medio">Porte Médio</button>
        <button onClick={() => filterDogs('Grande')} className="teste grande">Porte Grande</button>
      </div>
      
      <h2>Cachorros:</h2>
      <table>
        {filter && filteredDogs.length > 0 ? (
          filteredDogs.map((dog, index) => (
            <tr key={index}>
              <td> Nome: {dog.nome} <br></br> Raça: {dog.raça} <br></br> Idade: {dog.idade} <br></br> Porte: {dog.porte} </td>
            </tr> 
          ))
        ) : (
          <p>Nenhum cachorro encontrado.</p>
        )}
      </table>
    </div>
  );
}

export default App;
