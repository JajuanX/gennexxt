import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from 'next/link';
import { states } from '../../utils/us-states';

// Replace words with Icons hat represent each link
function SearchByState() {
	const [usState, setUsState] = useState('');
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	const handleChange = (event) => {
		setUsState(event.target.value)
	}

	return (
		<Box sx={{ width: '90%', margin: 'auto' }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">State</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={usState}
					label="State"
					onChange={handleChange}
					MenuProps={MenuProps}
				>
					{states.map(state => (
						<Link key={state} href={`/state/${state[1]}/stars/5`}>
							<MenuItem value={state[1]}>
								{state[0]}
							</MenuItem>
						</Link>
					))}
				</Select>
			</FormControl>
		</Box>
	)	
}

export default SearchByState;