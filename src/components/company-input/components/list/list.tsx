import styles from "./list.module.css";
import { TCompanies } from "../../hooks/use-api";

interface IList {
  companies: TCompanies;
  handleCompanyClick: (e: React.MouseEvent<HTMLParagraphElement>) => void;
  handleCompanyEnter: (e: React.KeyboardEvent<HTMLParagraphElement>) => void;
}

function List({ companies, handleCompanyClick, handleCompanyEnter }: IList): JSX.Element {
  return (
    <>
      {companies.map((company) => (
        <li key={company.logo} className={styles.item}>
          <div className={styles.logo}>
            <img src={company.logo} alt={`${company.name} лого`} />
          </div>
          <div className={styles.info}>
            <p
              tabIndex={0}
              className={styles.name}
              onClick={handleCompanyClick}
              onKeyDown={handleCompanyEnter}
            >
              {company.name}
            </p>
            <p className={styles.domain}>
              <a href={`https://${company.domain}`} target="_blank">
                {company.domain}
              </a>
            </p>
          </div>
        </li>
      ))}
    </>
  );
}

export default List;
