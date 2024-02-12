import { useEffect, useState } from "react";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  const [widthStr, setWidthStr] = useState("");
  const [heightStr, setHeightStr] = useState("");
  const [isMobileWidht, setIsMobileWidht] = useState(true);

  useEffect(() => {
    if (windowSize.width !== undefined && windowSize.width !== undefined) {
      setHeightStr(`${windowSize.height}px`);
      setWidthStr(`${windowSize.width}px`);
      setIsMobileWidht(windowSize.width < 1024);
    }
  }, [windowSize]);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    height: windowSize.height,
    width: windowSize.width,
    widthStr,
    heightStr,
    isMobileWidht,
  };
};

export default useWindowSize