import { ReactNode, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { Deadline, setDeadline } from '../firebase/concertsService';

type Props = {
	children: (open: () => void) => ReactNode;
	initialDate: Date | null;
};

const DeadlineDialog = ({ children, initialDate }: Props) => {
	const [open, setOpen] = useState(false);
	const [submitError, setSubmitError] = useState<string>();
	const [date, setDate] = useState<Date | null>(initialDate);

	const closeDialog = () => {
		setOpen(false);
		setSubmitError(undefined);
	};

	const handleSubmit = async () => {
		try {
			await setDeadline({ timestamp: Timestamp.fromDate(date ?? new Date()) });
			closeDialog();
		} catch (err) {
			setSubmitError('Error while setting the deadline');
		}
	};

	return (
		<>
			{children(() => setOpen(true))}
			<Dialog open={open} onClose={closeDialog}>
				<DialogTitle>Set Deadline</DialogTitle>
				<DialogContent>
					<DateTimePicker
						sx={{ width: '100%', marginTop: '1rem' }}
						label="Date"
						value={dayjs(date)}
						onChange={newValue => setDate(newValue?.toDate() ?? null)}
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
					<Button onClick={handleSubmit} variant="contained">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DeadlineDialog;
