import styles from './Propertie.module.css';
import PropTypes from 'prop-types';
import { IconButton } from '../iconButton/IconButton';
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
            <IconButton
              title={showAbout ? 'hide' : 'about'}
              className={styles.button}
              onClick={() => {
                setShowAbout(!showAbout);
              }}
            >
              {showAbout ? <div className='icon icon-chevron-up' /> : <div className='icon icon-question' />}
            </IconButton>
          </div>
        ) : null}
      </div>
      {about && showAbout ? (
        <div className={styles.about}>
          {about.split('\\n').map((str, index) => (
            <p key={index}>{str}</p>
          ))}
        </div>
      ) : null}
      {children}
    </div>
  );
}
