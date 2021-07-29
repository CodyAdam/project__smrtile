import styles from './SquareButton.module.css';

export default function SmallSquareButton(props: { onClick: () => void }) {
  return <button className={styles.button} onClick={props.onClick}></button>;
}
