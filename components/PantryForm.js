import React, { useState } from 'react';
import { firestore } from '../firebase';
import { TextField, Button, Grid } from '@mui/material';
import styles from '../styles/Home.module.css';

const PantryForm = ({ onItemAdded }) => {
  const [itemName, setItemName] = useState('');
  const [itemCount, setItemCount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const count = itemCount ? parseInt(itemCount) : 1;

    const newItem = { name: itemName, count };
    const docRef = await firestore.collection('pantry').add(newItem);
    onItemAdded({ ...newItem, id: docRef.id });

    setItemName('');
    setItemCount('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        label="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className={styles.input}
        required
      />
      <TextField
        label="Count"
        value={itemCount}
        onChange={(e) => setItemCount(e.target.value)}
        type="number"
        className={styles.input}
      />
      <Button type="submit" className={styles.button}>
        Add Item
      </Button>
    </form>
  );
};

export default PantryForm;
