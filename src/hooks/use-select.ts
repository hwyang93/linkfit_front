import { useState } from 'react';

export const useSelect = (initialValue?: string) => {
  const [value, setValue] = useState(initialValue || '');

  const onChange = (value: string) => {
    setValue(value);
  };

  const reset = () => {
    setValue('');
  };

  return { value, onChange, reset, setValue };
};
