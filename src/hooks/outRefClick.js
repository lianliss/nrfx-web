import React from 'react';

export default (ref, cb) => {
  React.useEffect(() => {
    document.addEventListener('click', handleOutClick);

    return () => {
      document.removeEventListener('click', handleOutClick);
    };
  }, []);

  const handleOutClick = (e) => {
    if (!ref.current) return;

    if (!ref.current.contains(e.target)) {
      cb();
    }
  };
};
