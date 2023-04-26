import React, { useState, useEffect } from 'react';
import './menucontainer.css';
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

  function MenuContainer() {
	const [menu, setMenu] = useState([]);
	const [itemId, setItemId] = useState('');
	const [itemName, setItemName] = useState('');
	const [itemPrice, setItemPrice] = useState(0);
	const [itemQuantity, setItemQuantity] = useState(0);
	const [itemDescription, setItemDescription] = useState('');
	const [itemCategory, setItemCategory] = useState('');
	const [itemCalories, setItemCalories] = useState(0);
	const [itemImage, setItemImage] = useState('');
	const [itemPrepTime, setItemPrepTime] = useState(0);
  
	useEffect(() => {
		refreshmenu();
	  }, []);
	
	  function refreshmenu(){
		axios.get('http://localhost/restaurant/php/api/menu.php')
		  .then(response => setMenu(response.data));
	  }
	
	  function handleChange(id, column, value) {
		axios.post('http://localhost/restaurant/php/api/menu.php', { id, column, value })
		  .then(response => {
			setMenu(response.data);
			refreshmenu();
		});
	  }
	
	  function handleAdd() {
		if (!itemName || !itemPrice || !itemQuantity ||  !itemDescription || !itemCategory || !itemCalories || !itemImage || !itemPrepTime) {
		  alert('Please enter all the details for the new item');
		  return;
		}
		
		const item = {
				itemName,
				itemPrice,
				itemQuantity,
				itemDescription,
				itemCategory,
				itemCalories,
				itemImage,
				itemPrepTime,
			  };
		axios.post('http://localhost/restaurant/php/api/menu.php', 
		{ item })
		  .then(response => {
			setItemId('');
			setItemName('');
			setItemPrice(0);
			setItemQuantity(0);
			setItemDescription('');
			setItemCategory('');
			setItemCalories(0);
			setItemImage('');
			setItemPrepTime(0);
			refreshmenu();
		  });
	  }
	
	  function handleDelete(Iid){
		let id= Iid
		axios.delete('http://localhost/forum/php/api/menu.php', {menu: id}).then(function(response){
			console.log(response.data)
			refreshmenu();
		})
	}

	function handleImageUpload(e) {
		e.preventDefault();
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
		  setItemImage(reader.result);
		};
		reader.onerror = (error) => {
		  console.log('Error: ', error);
		};
	  }

	return (
		<div className='menu-cont'>
			<h1>Menu</h1>
			<TableContainer component={Paper} sx={{width: '95%', margin: '10px auto'}}>
				<Table sx={{ minWidth: 650}} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="left">Item ID</StyledTableCell>
							<StyledTableCell align="center">Name</StyledTableCell>
							<StyledTableCell align="center">Price</StyledTableCell>
							<StyledTableCell align="center">Quantity</StyledTableCell>
							<StyledTableCell align="center">Description</StyledTableCell>
							<StyledTableCell align="center">Category</StyledTableCell>
							<StyledTableCell align="center">Calories</StyledTableCell>
							<StyledTableCell align="center">Image</StyledTableCell>
							<StyledTableCell align="center">Preparation Time</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{menu.map(item => (
							<StyledTableRow key={item.itemId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<StyledTableCell component="th" scope="row">{item.itemId}</StyledTableCell>
								<StyledTableCell align="center">{item.itemName}</StyledTableCell>
								<StyledTableCell align="center">
									<input className='menu-input-cont'
									type="number"
									value={item.itemPrice}
									onChange={e => handleChange(item.itemId, 'price', e.target.value)}
									/>
								</StyledTableCell>
								<StyledTableCell align="center">
									<input className='menu-input-cont'
									type="number"
									value={item.itemQuantity}
									onChange={e => handleChange(item.itemId, 'quantity', e.target.value)}
									/>
								</StyledTableCell>
								<StyledTableCell align="center">{item.itemDescription}</StyledTableCell>
								<StyledTableCell align="center">
									<select className='menu-select-cont' value={item.itemCategory} onChange={e => handleChange(item.itemId, 'category', e.target.value)}>
										<option value="appetizer">Appetizer</option>
										<option value="main">Main Dish</option>
										<option value="dessert">Desserts</option>
										<option value="drinks">Drinks</option>
									</select>
								</StyledTableCell>
								<StyledTableCell align="center">
									<input className='menu-input-cont'
									type="number"
									value={item.itemCalories}
									onChange={e => handleChange(item.itemId, 'calories', e.target.value)}
									/>
								</StyledTableCell>
								<StyledTableCell align="center">{item.itemImage}</StyledTableCell>
								<StyledTableCell align="center">
									<input className='menu-input-cont'
									type="number"
									value={item.itemPrepTime}
									onChange={e => handleChange(item.itemId, 'prep', e.target.value)}
									/>
								</StyledTableCell>
								<StyledTableCell align='left'><Button onClick={handleDelete(item.itemId)}>Remove menu</Button></StyledTableCell>
							</StyledTableRow>
						))}
						<StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<StyledTableCell align='left'><Button onClick={handleAdd}>Add item</Button></StyledTableCell>
							<StyledTableCell align="center">
								<input className='menu-input-cont' type="text" placeholder='Item Name' value={itemName} onChange={(e) => setItemName(e.target.value)} />
							</StyledTableCell>
							<StyledTableCell align="center">
								<input className='menu-input-cont' type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
							</StyledTableCell>
							<StyledTableCell align="center">
								<input className='menu-input-cont' type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
							</StyledTableCell>
							<StyledTableCell align="center">
								<textarea className='menu-input-cont' placeholder='Item Description' value={itemDescription} onChange={(e) => setItemDescription(e.target.value)}></textarea>
							</StyledTableCell>
							<StyledTableCell align="center">
								<select className='menu-select-cont' value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
									<option value="appetizer">Appetizer</option>
									<option value="main">Main Dish</option>
									<option value="dessert">Dessert</option>
									<option value="drinks">Drink</option>
								</select>
							</StyledTableCell>
							<StyledTableCell align="center">
								<input className='menu-input-cont' type="number" value={itemCalories} onChange={(e) => setItemCalories(e.target.value)} />
							</StyledTableCell>
							<StyledTableCell>
								<input className='menu-input-cont' type="file" onChange={handleImageUpload} />
							</StyledTableCell>
							<StyledTableCell>
								<input className='menu-input-cont' type="number" value={itemPrepTime} onChange={(e) => setItemPrepTime(e.target.value)} />
							</StyledTableCell>
							<StyledTableCell></StyledTableCell>
						</StyledTableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	  );
}

export default MenuContainer;