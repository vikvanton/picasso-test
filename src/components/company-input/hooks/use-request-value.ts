import { useEffect, useState } from "react";

interface IDebounce {
  requestValue: string;
  setRequestValue: (value: string) => void;
  setIsFind: (value: boolean) => void;
}

export function useRequestValue(inputValue: string): IDebounce {
  const [requestValue, setRequestValue] = useState("");
  const [isFind, setIsFind] = useState(false);

  useEffect(() => {
    if (!inputValue) return;
    if (isFind) {
      setIsFind(false);
      return;
    }

    const handler = setTimeout(() => {
      setRequestValue(inputValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return { requestValue, setRequestValue, setIsFind };
}
