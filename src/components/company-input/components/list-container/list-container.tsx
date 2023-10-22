import styles from "./list-container.module.css";

interface IListContainer {
  children: React.ReactNode;
}

function ListContainer({ children }: IListContainer) {
  return <ul className={styles.list}>{children}</ul>;
}

export default ListContainer;
