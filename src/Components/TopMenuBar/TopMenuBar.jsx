import React from 'react';
import Select from 'react-select';
import './TopMenuBar.css';
import familyData from '../../assets/all_family_names.json';


const TopMenuBar = ({ onSelectFamily }) => {
  const options = familyData.map(family => ({ label: family.name, value: family.id }));

  const handleChange = (selectedOptions) => {
    console.log(selectedOptions)
    onSelectFamily(selectedOptions.map(option => option.value));
    console.log(selectedOptions)
  };

  return (
    <div className="top-menu-bar">
      <h1>Californio Family Tree</h1>
      <Select
        isMulti
        options={options}
        onChange={handleChange}
        className="family-select"
        placeholder="Select Families"
        closeMenuOnSelect={false}
      />
    </div>
  );
};

export default TopMenuBar;