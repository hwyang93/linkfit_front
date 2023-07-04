import {useState} from 'react';

const useModal = () => {
  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  return {visible, open, close};
};

export default useModal;
