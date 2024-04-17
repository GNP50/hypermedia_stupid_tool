import React, { useState } from 'react';
import UserInput from './UserInput';
import EvaluationService from '../services/EvaluationService';
import { useNavigate } from 'react-router-dom';

export const ParentComponent = ({onSetUserUrl}) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  
  const handleButtonClick = async ({ name, url }) => {
    try {
      console.log('Setting data for:', name, url);
      EvaluationService.getToFilled(name, url);
      onSetUserUrl(name, url);
      navigate("/continue-insert");

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <UserInput handleButtonClick={handleButtonClick} />
    </div>
  );
};

export default ParentComponent;
