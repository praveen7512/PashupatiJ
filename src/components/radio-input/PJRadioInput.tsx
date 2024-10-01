import React from 'react';
import { Radio, FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import './radioInput-styles.scss';

interface RadioInputProps {
  selectedValue: string;
  handleChange: (value: string) => void;
  label: string;
  options: { value: string, label: string }[];
}

const RadioInput: React.FC<RadioInputProps> = ({ selectedValue, handleChange, label, options }) => {
  return (
    <FormControl component="fieldset" className="radioInput__container">
      <FormLabel component="legend" className="radioInput__label">{label}</FormLabel>
      <RadioGroup
        aria-label={label}
        name={label}
        value={selectedValue}
        onChange={(e) => handleChange(e.target.value)}
        className="radioInput__group"
      >
        {options.map((option) => (
          <FormControlLabel 
            key={option.value} 
            value={option.value} 
            control={<Radio />} 
            label={option.label} 
            className="radioInput__option" 
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInput;
