import React, { useState, useEffect } from 'react';
import TopMenuBar from './Components/TopMenuBar/TopMenuBar';
import FamilyTree from './Components/FamilyTree/FamilyTree';

const App = () => {

  const [selectedFamilies, setSelectedFamilies] = useState([]);

  const handleSelectFamily = (families) => {
    setSelectedFamilies(families);
  };



  return (
    <div className="App">
      <div>
          <TopMenuBar selectedFamilies={selectedFamilies} onSelectFamily={handleSelectFamily} />
      </div>

        <div>
          <FamilyTree selectedFamilies={selectedFamilies}/>
        </div>


    </div>
  );
}

export default App;