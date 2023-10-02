import { useState } from 'react';

export type LabeledSelect = {
  label: string;
  value: string;
};

export const useLabeledSelect = (initialValue?: LabeledSelect) => {
  const [data, setData] = useState(initialValue || { label: '', value: '' });

  const onChange = (data: LabeledSelect) => {
    setData(data);
  };

  const reset = () => {
    setData({ label: '', value: '' });
  };

  return { data, onChange, reset, setData };
};
