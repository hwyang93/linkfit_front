import { useState } from 'react';

const useFilter = (initialValue?: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (value: string) => {
    setValue(value);
  };

  const reset = () => {
    setValue(initialValue || '');
  };

  return { value, onChange, reset, setValue };
};

export default useFilter;
