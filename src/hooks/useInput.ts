import {useState} from 'react';

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (text: string) => {
    setValue(text);
  };

  return {value, onChange};
};

export default useInput;
