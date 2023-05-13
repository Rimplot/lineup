import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Timestamp } from 'firebase/firestore';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { Concert } from '../firebase/concertsService';

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
	const [selectedFileString, setselectedFileString] = useState<string>('');

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
		if (selectedFileString) {
			newConcert.artist.imageUrl = selectedFileString;
		}
		onSubmit(newConcert);
		closeDialog();
	};

	return (
		<>
			{children(() => setOpen(true))}
			<Dialog open={open} onClose={closeDialog}>
				<DialogTitle>Add Concert</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						minWidth: 500
					}}
				>
					<Box>
						<TextField
							label="Artist Name"
							variant="outlined"
							defaultValue={concert?.artist.name}
							fullWidth
							{...register('artist.name', { required: true })}
							error={errors.artist?.name ? true : false}
							helperText={errors.artist?.name ? 'Artist Name is required' : ''}
						/>
						<TextField
							label="Short Description"
							variant="outlined"
							defaultValue={concert?.artist.shortDescription}
							fullWidth
							{...register('artist.shortDescription')}
						/>
						<TextField
							label="Full Description"
							variant="outlined"
							defaultValue={concert?.artist.fullDescription}
							fullWidth
							{...register('artist.fullDescription')}
						/>
						<TextField
							label="Stage"
							variant="outlined"
							defaultValue={concert?.stage}
							fullWidth
							{...register('stage', { required: true })}
							error={errors.stage ? true : false}
							helperText={errors.stage ? 'Stage is required' : ''}
						/>
						<LocalizationProvider>
							<DateTimePicker
								sx={{ width: '100%' }}
								label="Date"
								value={dayjs(date)}
								onChange={newValue => setDate(newValue?.toDate() ?? null)}
							/>
						</LocalizationProvider>
						<FilePicker
							setFiles={setselectedFileString}
							image={concert?.artist.imageUrl}
						/>
					</Box>
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
