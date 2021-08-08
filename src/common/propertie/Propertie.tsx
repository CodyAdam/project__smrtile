import PropTypes from 'prop-types';
import { SmallSquareButton } from '../smallSquareButton/SmallSquareButton';
import styles from './Propertie.module.css';
import { useState } from 'react';

export function Propertie({
  name,
  children,
  about,
}: {
  name: string;
  children?: PropTypes.ReactElementLike;
  about?: string;
}) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <h2>{name}</h2>
        {about ? (
          <div className={styles.buttonContainer}>
            <SmallSquareButton
              className={styles.button}
              onClick={() => {
                setShowAbout(!showAbout);
              }}
            >
              <div className='icon icon-question' />
            </SmallSquareButton>
          </div>
        ) : null}
      </div>
      {about && showAbout ? <p className={styles.about}>{about}</p> : null}
      {children}
    </div>
  );
}
