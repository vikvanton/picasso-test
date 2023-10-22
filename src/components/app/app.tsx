import { useState } from "react";
import CompanyInput from "../company-input/company-input";
import styles from "./app.module.css";

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(inputValue);
    setInputValue("");
  };

  return (
    <form className={styles.container} onSubmit={handleFormSubmit}>
      <label htmlFor="company">
        <span className={styles.title}>Компания</span>
        <CompanyInput value={inputValue} name="company" id="company" onChange={setInputValue} />
      </label>
      <button className={styles.btn} type="submit">
        Показать
      </button>
    </form>
  );
}

export default App;
