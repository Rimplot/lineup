import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
	ClickAwayListener,
	FormControl,
	InputLabel,
	Menu,
	MenuItem,
	Select,
	SelectChangeEvent
} from '@mui/material';

import useFavorites from '../hooks/useFavorites';
import { Concert } from '../firebase/concertsService';
import { StageDetails } from '../model/Stages';
import { GenreDetails } from '../model/Genres';

type ConcertsTableProps = {
	concerts: Array<Concert>;
};

const ConcertsTable = ({ concerts }: ConcertsTableProps) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [rowCount, setRowCount] = useState(concerts.length);
	const [stage, setStage] = useState<string>('');
	const [genre, setGenre] = useState<string>('');

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const filterOpen = Boolean(anchorEl);
	const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleFilterClose = () => {
		setAnchorEl(null);
	};

	const handleStageChange = (event: SelectChangeEvent) => {
		setStage(event.target.value as string);
	};

	const handleGenreChange = (event: SelectChangeEvent) => {
		setGenre(event.target.value as string);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 5));
		setPage(0);
	};

	const filteredConcerts = React.useMemo(() => {
		const filtered = concerts.filter(
			c =>
				(stage === '' || c.stage === stage) &&
				(genre === '' || c.artist.genre === genre)
		);
		setRowCount(filtered.length);
		return filtered;
	}, [stage, genre]);

	const visibleConcerts = React.useMemo(
		() =>
			filteredConcerts.slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[page, rowsPerPage, filteredConcerts]
	);

	const { isFavorite } = useFavorites();

	return (
		<>
			<TableContainer component={Paper}>
				<Toolbar
					sx={{
						pl: { sm: 2 },
						pr: { xs: 1, sm: 1 }
					}}
				>
					<Typography
						sx={{ flex: '1 1 100%' }}
						variant="h6"
						id="tableTitle"
						component="div"
					>
						Full lineup
					</Typography>
					<Tooltip title="Filter list">
						<IconButton onClick={handleFilterClick}>
							<FilterListIcon />
						</IconButton>
					</Tooltip>
					<ClickAwayListener
						mouseEvent="onMouseDown"
						touchEvent="onTouchStart"
						onClickAway={handleFilterClose}
					>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={filterOpen}
							onClose={handleFilterClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
								'sx': { width: '300px', padding: '16px' }
							}}
						>
							<FormControl fullWidth>
								<InputLabel id="stage-filter-label">Stage</InputLabel>
								<Select
									labelId="stage-filter-label"
									value={stage}
									label="Stage"
									onChange={handleStageChange}
								>
									<MenuItem value="">None</MenuItem>
									{Object.keys(StageDetails).map(key => (
										<MenuItem key={key} value={key}>
											{StageDetails[key].name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl fullWidth sx={{ mt: 2 }}>
								<InputLabel id="genre-filter-label">Genre</InputLabel>
								<Select
									labelId="genre-filter-label"
									value={genre}
									label="Genre"
									onChange={handleGenreChange}
								>
									<MenuItem value="">None</MenuItem>
									{Object.keys(GenreDetails).map(key => (
										<MenuItem key={key} value={key}>
											{GenreDetails[key].name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Menu>
					</ClickAwayListener>
				</Toolbar>
				<Table sx={{ minWidth: 650 }} aria-label="festival lineup">
					<TableHead>
						<TableRow>
							<TableCell>Favorite</TableCell>
							<TableCell>Performer</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Stage</TableCell>
							<TableCell>Genre</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{visibleConcerts.map((concert, index) => (
							<TableRow
								key={index}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell sx={{ color: 'red' }}>
									{isFavorite(concert.id!) && <FavoriteIcon />}
								</TableCell>
								<TableCell component="th" scope="row">
									{concert.artist.name}
								</TableCell>
								<TableCell>{concert.date.toDate().toLocaleString()}</TableCell>
								<TableCell>{StageDetails[concert.stage].name}</TableCell>
								<TableCell>{concert.artist.genre}</TableCell>
							</TableRow>
						))}
						{visibleConcerts.length === 0 && (
							<TableRow>
								<TableCell>No concerts match your criteria.</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={rowCount}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</>
	);
};

export default ConcertsTable;
