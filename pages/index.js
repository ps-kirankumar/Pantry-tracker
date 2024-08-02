import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemCount, setItemCount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(firestore, 'pantry'));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(items);
    };
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (!itemName) return;

    let count = parseInt(itemCount, 10);
    if (isNaN(count) || count <= 0) count = 1;

    const existingItem = items.find(item => item.name.toLowerCase() === itemName.toLowerCase());
    if (existingItem) {
      const updatedItem = { ...existingItem, count: existingItem.count + count };
      await updateDoc(doc(firestore, 'pantry', existingItem.id), { count: updatedItem.count });
      setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    } else {
      const newItem = { name: itemName, count };
      const docRef = await addDoc(collection(firestore, 'pantry'), newItem);
      setItems([...items, { ...newItem, id: docRef.id }]);
    }

    setItemName('');
    setItemCount('');
  };

  const handleUpdateCount = async (id, newCount) => {
    await updateDoc(doc(firestore, 'pantry', id), { count: newCount });
    setItems(items.map(item => item.id === id ? { ...item, count: newCount } : item));
  };

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>Pantry Tracker</h1>
      <div className={styles.form}>
        <TextField label="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <TextField label="Count" type="number" value={itemCount} onChange={(e) => setItemCount(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleAddItem}>Add Item</Button>
      </div>
      <div className={styles.search}>
        <TextField label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <List className={styles.list}>
        {filteredItems.map(item => (
          <ListItem key={item.id} className={styles.listItem}>
            <ListItemText primary={`${item.name} - Count: ${item.count}`} />
            <IconButton onClick={() => handleUpdateCount(item.id, item.count + 1)}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={() => item.count > 1 ? handleUpdateCount(item.id, item.count - 1) : null}>
              <RemoveIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
