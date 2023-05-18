import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	MenuItem,
	TextField,
	Typography
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Timestamp } from 'firebase/firestore';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { Concert } from '../firebase/concertsService';
import { StageDetails } from '../model/Stages';
import { GenreDetails } from '../model/Genres';

import FilePicker from './FilePicker';

type Props = {
	children: (open: () => void) => ReactNode;
	onSubmit: (concert: Concert) => void;
	concert?: Concert;
};

const ConcertFormDialog = ({ children, onSubmit, concert }: Props) => {
	// Open state
	const [open, setOpen] = useState(false);

	const [submitError, setSubmitError] = useState<string>();

	const [date, setDate] = useState<Date | null>(concert?.date.toDate() ?? null);
	const [images, setImages] = useState<Array<string>>([]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<Concert>();

	useEffect(() => {
		reset();
	}, [open]);

	// Close and reset handler
	const closeDialog = () => {
		setOpen(false);
		setSubmitError(undefined);
	};

	const onSubmitForm = async (data: Concert) => {
		const newConcert: Concert = {
			...data
		};
		newConcert.id = concert?.id;
		newConcert.date = Timestamp.fromMillis(Date.parse(date?.toString() ?? ''));
		newConcert.artist.images = images;
		onSubmit(newConcert);
		closeDialog();
	};

	return (
		<>
			{children(() => setOpen(true))}
			<Dialog open={open} onClose={closeDialog}>
				<DialogTitle>{concert ? 'Edit Concert' : 'New Concert'}</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 3,
						minWidth: 500
					}}
				>
					<Box sx={{ height: 4 }} />
					<TextField
						label="Artist Name"
						variant="outlined"
						defaultValue={concert?.artist.name}
						fullWidth
						{...register('artist.name', { required: true })}
						error={errors.artist?.name ? true : false}
						helperText={errors.artist?.name ? 'Artist Name is required' : ''}
					/>
					<FormControlLabel
						control={
							<Checkbox
								defaultChecked={concert?.headliner ?? false}
								{...register('headliner')}
							/>
						}
						label="Is Headliner"
					/>
					<TextField
						label="Short Description"
						variant="outlined"
						defaultValue={concert?.artist.shortDescription}
						fullWidth
						multiline
						rows={3}
						maxRows={5}
						{...register('artist.shortDescription')}
					/>
					<TextField
						label="Full Description"
						variant="outlined"
						defaultValue={concert?.artist.fullDescription}
						fullWidth
						multiline
						rows={6}
						maxRows={10}
						{...register('artist.fullDescription')}
					/>
					<TextField
						select
						label="Genre"
						variant="outlined"
						defaultValue={concert?.artist.genre ?? 'none'}
						fullWidth
						{...register('artist.genre', { required: true })}
						error={errors.artist?.genre ? true : false}
						helperText={errors.artist?.genre ? 'Genre is required' : ''}
					>
						{Object.keys(GenreDetails).map(key => (
							<MenuItem key={key} value={key}>
								{GenreDetails[key].name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						label="Stage"
						variant="outlined"
						defaultValue={concert?.stage ?? 'none'}
						fullWidth
						{...register('stage', { required: true })}
						error={errors.stage ? true : false}
						helperText={errors.stage ? 'Stage is required' : ''}
					>
						{Object.keys(StageDetails).map(key => (
							<MenuItem key={key} value={key}>
								{StageDetails[key].name}
							</MenuItem>
						))}
					</TextField>
					<LocalizationProvider>
						<DateTimePicker
							sx={{ width: '100%' }}
							label="Date"
							value={dayjs(date)}
							onChange={newValue => setDate(newValue?.toDate() ?? null)}
						/>
					</LocalizationProvider>
					<FilePicker
						setFiles={setImages}
						images={concert?.artist.images ?? []}
					/>
				</DialogContent>
				<DialogActions>
					{submitError && (
						<Typography
							variant="subtitle2"
							align="left"
							color="error"
							paragraph
							sx={{ mb: 0, mr: 2 }}
						>
							{submitError}
						</Typography>
					)}
					<Button onClick={closeDialog} variant="outlined">
						Cancel
					</Button>
					<Button onClick={handleSubmit(onSubmitForm)} variant="contained">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ConcertFormDialog;
