import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { Timestamp } from 'firebase/firestore';

import { Concert } from '../firebase/concertsService';

type Props = {
	onSubmit: (concert: Concert) => void;
};

const ConcertForm = ({ onSubmit }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Concert>();

	const [date, setDate] = useState<Timestamp>();

	const onSubmitForm = (data: Concert) => {
		data.date = date ?? Timestamp.now();
		onSubmit(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmitForm)}>
			<TextField
				label="Artist Name"
				variant="outlined"
				fullWidth
				{...register('artist.name', { required: true })}
				error={errors.artist?.name ? true : false}
				helperText={errors.artist?.name ? 'Artist Name is required' : ''}
			/>
			<TextField
				label="Short Description"
				variant="outlined"
				fullWidth
				{...register('artist.shortDescription')}
			/>
			<TextField
				label="Full Description"
				variant="outlined"
				fullWidth
				{...register('artist.fullDescription')}
			/>
			<TextField
				label="Image URL"
				variant="outlined"
				fullWidth
				{...register('artist.imageUrl', {
					pattern: {
						value: /^https?:\/\/\S+$/i,
						message: 'Invalid URL'
					}
				})}
				error={errors.artist?.imageUrl ? true : false}
				helperText={
					errors.artist?.imageUrl
						? errors.artist.imageUrl.message
						: 'Enter URL of the artist image'
				}
			/>
			<TextField
				label="Date"
				variant="outlined"
				fullWidth
				type="datetime-local"
				// {...register('date', { required: true })}
				value={date?.toDate().toLocaleString()}
				onChange={e =>
					setDate(Timestamp.fromMillis(Date.parse(e.target.value)))
				}
				error={errors.date ? true : false}
				helperText={errors.date ? 'Date is required' : ''}
			/>
			<TextField
				label="Stage"
				variant="outlined"
				fullWidth
				{...register('stage', { required: true })}
				error={errors.stage ? true : false}
				helperText={errors.stage ? 'Stage is required' : ''}
			/>
			<Button type="submit" variant="contained" sx={{ mt: 2 }}>
				Create Concert
			</Button>
		</form>
	);
};

export default ConcertForm;
