import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from '../styles/Home.module.css';

const PantryList = ({ items, onUpdateCount }) => {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div key={item.id} className={styles.listItem}>
          <span className={styles.itemName}>{item.name}</span>
          <div className={styles.itemActions}>
            <IconButton
              onClick={() => onUpdateCount(item.id, item.count + 1)}
              className={styles.iconButton}
            >
              <AddIcon />
            </IconButton>
            <span>{item.count}</span>
            <IconButton
              onClick={() => onUpdateCount(item.id, item.count - 1)}
              className={styles.iconButton}
              disabled={item.count === 1}
            >
              <RemoveIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PantryList;
