import { useState } from 'react';

const useInput = (initialValue?: string) => {
  const [value, setValue] = useState(initialValue || '');

  const onChange = (value: string) => {
    setValue(value);
  };

  const reset = () => {
    setValue(initialValue || '');
  };

  return { value, onChange, setValue, reset };
};

export default useInput;
