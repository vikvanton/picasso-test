import { useLayoutEffect } from "react";
import { useRequestValue } from "./hooks/use-request-value";
import styles from "./company-input.module.css";
import { useApi } from "./hooks/use-api";
import ListContainer from "./components/list-container/list-container";
import List from "./components/list/list";

interface ICompanyInput {
  value: string;
  placeholder?: string;
  id?: string;
  name?: string;
  textError?: string;
  width?: string;
  onChange: (value: string) => void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
}

function CompanyInput({
  value,
  placeholder,
  id,
  name,
  textError,
  width,
  onChange,
  onBlur,
  onFocus,
}: ICompanyInput): JSX.Element {
  const { requestValue, setRequestValue, setIsFind } = useRequestValue(value);
  const { companies, apiEerror, setCompanies } = useApi(requestValue);

  useLayoutEffect(() => {
    if (companies.length && !value) {
      setCompanies([]);
      setRequestValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies.length, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleListClose = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setCompanies([]);
    }
  };

  const onCompanyFind = (name: string) => {
    onChange(name);
    setRequestValue("");
    setCompanies([]);
    setIsFind(true);
  };

  const handleCompanyClick = (value: string) => {
    onCompanyFind(value);
  };

  const handleCompanyEnter = (value: string) => {
    onCompanyFind(value);
  };

  return (
    <span style={{ width }} className={styles.container}>
      <input
        type="text"
        style={{
          borderRadius: `${companies.length || apiEerror ? "4px 4px 0 0" : "4px"}`,
        }}
        className={styles.input}
        value={value}
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={handleInputChange}
        onKeyDown={handleListClose}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {textError && <p className={styles.textError}>{textError}</p>}
      {!apiEerror && companies.length > 0 && (
        <ListContainer>
          <List
            companies={companies}
            handleCompanyClick={handleCompanyClick}
            handleCompanyEnter={handleCompanyEnter}
          />
        </ListContainer>
      )}
      {apiEerror && (
        <ListContainer>
          <li className={styles.apiError}>{apiEerror}</li>
        </ListContainer>
      )}
    </span>
  );
}

export default CompanyInput;
