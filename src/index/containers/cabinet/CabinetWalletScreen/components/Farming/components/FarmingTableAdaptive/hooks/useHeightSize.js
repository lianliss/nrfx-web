import { useState, useEffect } from 'react';

function useHeightSize() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const adaptiveTableHeightSetter = () => {
      setHeight(0);
      const farmingContainerHeight =
        document.querySelector('.Farming').clientHeight;
      const farmingHeaderHeight =
        document.querySelector('.Farming__header').clientHeight;
      const tableHeaderHeight = document.querySelector(
        '.FarmingTableHeader'
      ).clientHeight;

      setHeight(
        farmingContainerHeight -
          (farmingHeaderHeight + tableHeaderHeight + 24 + 23)
      );
    };

    adaptiveTableHeightSetter();

    window.addEventListener('resize', adaptiveTableHeightSetter);

    return () => {
      window.removeEventListener('resize', adaptiveTableHeightSetter);
    };
  }, []);

  return height;
}

export default useHeightSize;
