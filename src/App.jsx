import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './App.css'; // Make sure the path is correct

function App() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [status, setStatus] = useState('');

  const [isAge, setIsAge] = useState(true);
  const [isWeight, setIsWeight] = useState(true);
  const [isHeight, setIsHeight] = useState(true);

  // Validate input fields
  const Validate = (e) => {
    const { id, value } = e.target;
    if (!!value.match(/^[0-9]*$/)) {
      if (id === 'AGE') {
        setAge(value);
        setIsAge(true);
      } else if (id === 'WEIGHT') {
        setWeight(value);
        setIsWeight(true);
      } else {
        setHeight(value);
        setIsHeight(true);
      }
    } else {
      if (id === 'AGE') {
        setAge(value);
        setIsAge(false);
      } else if (id === 'WEIGHT') {
        setWeight(value);
        setIsWeight(false);
      } else {
        setHeight(value);
        setIsHeight(false);
      }
    }
  };

  // Calculate BMI
  const handleCalculate = (e) => {
    e.preventDefault();
    if (!age || !weight || !height) {
      alert('Please fill in all fields correctly.');
      return;
    }
    const calculatedBmi = (parseFloat(weight) / (((parseFloat(height) / 100) * parseFloat(height)) / 100)).toFixed(2);
    setBmi(calculatedBmi);
    setStatus(determineStatus(calculatedBmi));
  };

  // Determine BMI Status
  const determineStatus = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    else if (bmi >= 18.5 && bmi <= 24.9) return 'Normal weight';
    else if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
    else return 'Obesity';
  };

  // Reset all fields
  const handleReset = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setBmi('');
    setStatus('');
  };

  return (
    <>
      <div className="box">
        <div className="box-inner">
          <div className="main">
            <h2>BMI CALCULATOR</h2>
          </div>
          <form onSubmit={handleCalculate}>
            <div className="text-field">
              <TextField id="AGE" label="Age" variant="outlined" value={age} onChange={Validate} />
              {!isAge && <p className='text-danger'>*Invalid Input</p>}
            </div>
            <div className="text-field">
              <TextField id="WEIGHT" label="Weight (kg)" variant="outlined" value={weight} onChange={Validate} />
              {!isWeight && <p>*Invalid Input</p>}
            </div>
            <div className="text-field">
              <TextField id="HEIGHT" label="Height (cm)" variant="outlined" value={height} onChange={Validate} />
              {!isHeight && <p className='text-danger'>*Invalid Input</p>}
            </div>
            <div className="btn-container">
              <Button variant="contained" color='warning' className="btn" disabled={!isAge || !isWeight || !isHeight} type='submit'>Calculate</Button>
              <Button onClick={handleReset} variant="contained" color='success' className="btn">Reset</Button>
            </div>
          </form>
          <div className="result">
            {bmi && <h5>Your BMI is: {bmi}</h5>}
            {status && <h5>Status: {status}</h5>}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;