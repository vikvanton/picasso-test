import styles from "./list.module.css";
import { TCompanies } from "../../hooks/use-api";

interface IList {
  companies: TCompanies;
  handleCompanyClick: (value: string) => void;
  handleCompanyEnter: (value: string) => void;
}

function List({ companies, handleCompanyClick, handleCompanyEnter }: IList): JSX.Element {
  return (
    <>
      {companies.map((company) => {
        const onClick = () => handleCompanyClick(company.name);
        const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleCompanyEnter(company.name);
          }
        };

        return (
          <li key={company.logo} className={styles.item}>
            <div className={styles.logo}>
              <img src={company.logo} alt={`${company.name} лого`} />
            </div>
            <div className={styles.info}>
              <p tabIndex={0} className={styles.name} onClick={onClick} onKeyDown={onKeyDown}>
                {company.name}
              </p>
              <p className={styles.domain}>
                <a href={`https://${company.domain}`} target="_blank">
                  {company.domain}
                </a>
              </p>
            </div>
          </li>
        );
      })}
    </>
  );
}

export default List;
