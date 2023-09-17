import {useState} from 'react';

export const useSelect = () => {
  const [value, setValue] = useState('');

  const onChange = (value: string) => {
    setValue(value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    value,
    onChange,
    reset,
  };
};
