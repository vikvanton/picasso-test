import { useEffect, useState } from "react";

export type TCompanies = Array<{ domain: string; name: string; logo: string }>;

interface IApi {
  companies: TCompanies;
  apiEerror: string;
  setCompanies: (value: TCompanies) => void;
}

export function useApi(requestValue: string): IApi {
  const [companies, setCompanies] = useState<TCompanies>([]);
  const [apiEerror, setApiError] = useState("");

  useEffect(() => {
    const checkedValue = requestValue.trim();
    if (!checkedValue && companies.length) setCompanies([]);
    if (!checkedValue) return;

    fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${checkedValue}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.length) setCompanies(data);
        else {
          setCompanies([]);
          setApiError("Не удалось найти совпадения");
        }
      })
      .catch(() => {
        setCompanies([]);
        setApiError("Не удалось получить совпадения");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestValue]);

  useEffect(() => {
    if (apiEerror) {
      setTimeout(() => {
        setApiError("");
      }, 1000);
    }
  }, [apiEerror]);

  return { companies, apiEerror, setCompanies };
}
