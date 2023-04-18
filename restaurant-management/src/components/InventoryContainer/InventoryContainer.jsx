import React, { useState, useEffect } from 'react';
import './inventorycontainer.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  
	[`&.${tableCellClasses.head}`]: {
	  backgroundColor: '#000000',
	  color: theme.palette.common.white,
	  
	
	},
	[`&.${tableCellClasses.body}`]: {
	  fontSize: 14,
	  backgroundColor: '#e1e1e1'
	},
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
	  backgroundColor: '#dce4e7',
	  
	},
	'&:last-child td, &:last-child th': {
	  border: 0,
	},
  }));



function InventoryContainer() {
  const [data, setData] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [quantityInput, setQuantityInput] = useState(0);

  useEffect(() => {
    refreshInventory();
  }, []);

  function refreshInventory(){
	axios.get('http://localhost/restaurant/php/api/inventory.php')
      .then(response => setData(response.data));
  }

  function handleChange(id, quantity) {
    axios.post('http://localhost/restaurant/php/api/inventory.php', { id, quantity })
      .then(response => {
		setData(response.data)
		refreshInventory();
	  });
  }

  function handleAdd() {
    if (!nameInput || !quantityInput) {
      alert('Please enter a name and quantity for the new item');
      return;
    }

    axios.post('http://localhost/restaurant/php/api/inventory.php', { name: nameInput, quantity: quantityInput })
      .then(response => {
        setData(response.data);
        setNameInput('');
        setQuantityInput(0);
		refreshInventory();
      });
  }

  return (
	<div className='inventory-cont'>
		<h1>Inventory</h1>
		<TableContainer component={Paper} sx={{width: '95%', margin: '10px auto'}}>
			<Table sx={{ minWidth: 650}} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="left">Item ID</StyledTableCell>
						<StyledTableCell align="center">Item Name</StyledTableCell>
						<StyledTableCell align="center">Quantity</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(item => (
						<StyledTableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<StyledTableCell component="th" scope="row">{item.id}</StyledTableCell>
							<StyledTableCell align="center">{item.name}</StyledTableCell>
							<StyledTableCell align="center">
								<input className='inventory-input-cont'
								type="number"
								value={item.quantity}
								onChange={e => handleChange(item.id, e.target.value)}
								/>
							</StyledTableCell>
						</StyledTableRow>
					))}
					<StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
						<StyledTableCell align='left'><Button onClick={handleAdd}>Add Item</Button></StyledTableCell>
						<StyledTableCell align="center">
							<input className='inventory-input-cont'
								type="text"
								placeholder="Name"
								value={nameInput}
								onChange={e => setNameInput(e.target.value)} 
							/>
						</StyledTableCell>
						<StyledTableCell align="center">
							<input className='inventory-input-cont' 
								type="number"
								placeholder="Quantity"
								value={quantityInput}
								onChange={e => setQuantityInput(e.target.value)}
							/>
						</StyledTableCell>
					</StyledTableRow>
				</TableBody>
			</Table>
		</TableContainer>
	</div>
  );
}

export default InventoryContainer;
