import styles from './NavBar.module.css';
import { NavButton } from './NavButton';

//icons
import EditorIcon from '../../common/svg/Backspace';
import CreatorIcon from '../../common/svg/Star';
import ParametersIcon from '../../common/svg/Cog';

export function NavBar() {
  return (
    <div className={styles.container}>
      <NavButton selected={false}>
        <EditorIcon />
      </NavButton>
      <NavButton selected={true}>
        <CreatorIcon />
      </NavButton>
      <NavButton selected={false}>
        <CreatorIcon />
      </NavButton>
      <div className={styles.spacer} />
      <NavButton selected={false}>
        <ParametersIcon />
      </NavButton>
    </div>
  );
}
