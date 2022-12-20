import {useState} from 'react';

const useInput = (
  initialValue: string,
  validator?: (value: string) => boolean,
) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (text: string) => {
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(text);
    }
  };
  return {value, onChange};
};

export default useInput;
