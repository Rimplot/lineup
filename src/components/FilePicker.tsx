import { Box, Button, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useFilePicker } from 'use-file-picker';

type Props = {
	setFiles: React.Dispatch<React.SetStateAction<string>>;
	image?: string;
};

const FilePicker = ({ setFiles, image }: Props) => {
	const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
		readAs: 'DataURL',
		accept: 'image/*',
		multiple: true,
		limitFilesConfig: { max: 1 },
		maxFileSize: 50
	});

	useEffect(() => {
		if (filesContent.length > 0) {
			setFiles(filesContent[0].content);
		} else if (image) {
			setFiles(image);
		}
	}, [filesContent]);

	if (loading) {
		return <Box>Loading...</Box>;
	}

	return (
		<Box>
			{!!image && filesContent.length === 0 && (
				<Box
					component="img"
					sx={{
						height: 233,
						width: 350,
						maxHeight: { xs: 233, md: 167 },
						maxWidth: { xs: 350, md: 250 }
					}}
					src={image}
				/>
			)}
			{filesContent.map((file, index) => (
				<Box key={index}>
					<Typography>{file.name}</Typography>
					<Box
						component="img"
						sx={{
							height: 233,
							width: 350,
							maxHeight: { xs: 233, md: 167 },
							maxWidth: { xs: 350, md: 250 }
						}}
						alt={file.name}
						src={file.content}
					/>
				</Box>
			))}
			{errors.length ? <Box>Error...select only one image.</Box> : null}
			<Divider sx={{ my: 1 }} />
			<Button onClick={() => openFileSelector()}>Upload photo </Button>
		</Box>
	);
};

export default FilePicker;
