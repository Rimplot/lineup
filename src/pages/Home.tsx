import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Countdown from '../components/Countdown';
import PerformersGrid from '../components/PerformersGrid';
import { useCallback, useRef } from 'react';
import jumbotron_bg from '../assets/home_jumbotron_bg.jpg';
import useFavorites from '../hooks/useFavorites';
import ConcertsTable from '../components/ConcertsTable';
import { Timestamp } from 'firebase/firestore';
import { Concert } from '../firebase/concertsService';

const concert = {
	id: 'thedoors',
	stage: 'cocacola',
	date: new Timestamp(new Date('2023-05-29 20:00').getTime() / 1000, 0),
	artist: {
		name: 'The Doors',
		imageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/6/69/The_Doors_1968.JPG',
		shortDescription:
			"The Doors were an American rock band formed in Los Angeles in 1965, with vocalist Jim Morrison, keyboardist Ray Manzarek, guitarist Robby Krieger, and drummer John Densmore. They were among the most influential and controversial rock acts of the 1960s, partly due to Morrison's lyrics and voice.",
		fullDescription:
			"The Doors were an American rock band formed in Los Angeles in 1965, with vocalist Jim Morrison, keyboardist Ray Manzarek, guitarist Robby Krieger, and drummer John Densmore. They were among the most influential and controversial rock acts of the 1960s, partly due to Morrison's lyrics and voice, along with his erratic stage persona. The group is widely regarded as an important figure of the era's counterculture.\nThe band took its name from the title of Aldous Huxley's book The Doors of Perception, itself a reference to a quote by William Blake. After signing with Elektra Records in 1966, the Doors with Morrison recorded and released six studio albums in five years, some of which are generally considered among the greatest of all time, including their self-titled debut (1967), Strange Days (1967), and L.A. Woman (1971). Dubbed the \"Kings of Acid Rock\", they were one of the most successful bands during that time and by 1972 the Doors had sold over 4 million albums domestically and nearly 8 million singles.\nMorrison died in uncertain circumstances in 1971. The band continued as a trio until disbanding in 1973. They released three more albums in the 1970s, one of which featured earlier recordings by Morrison, and over the decades reunited on stage in various configurations. In 2002, Manzarek, Krieger, and Ian Astbury of the Cult on vocals started performing as \"The Doors of the 21st Century\". Densmore and the Morrison estate successfully sued them over the use of the band's name. After a short time as Riders on the Storm, they settled on the name Manzarek–Krieger and toured until Manzarek's death in 2013.",
		genre: 'rock'
	}
} as Concert;

const concert2 = {
	id: 'kaleo',
	stage: 'bluesoft',
	date: new Timestamp(new Date('2023-05-30 21:00').getTime() / 1000, 0),
	artist: {
		name: 'KALEO',
		imageUrl:
			'https://yt3.googleusercontent.com/ytc/AGIKgqMogghAjwSfVhpyAD_mS-QXKMy7mpqgUdCBa-uH1A=s900-c-k-c0x00ffffff-no-rj',
		shortDescription:
			'Kaleo (stylized as KALEO) is an Icelandic blues rock band which formed in Mosfellsbær in 2012. It consists of lead vocalist and guitarist Jökull Júlíusson, drummer David Antonsson, bassist Daniel Kristjansson, lead guitarist Rubin Pollock and harmonicist Þorleifur Gaukur Davíðsson.',
		fullDescription:
			'Kaleo (stylized as KALEO) is an Icelandic blues rock band which formed in Mosfellsbær in 2012. It consists of lead vocalist and guitarist Jökull Júlíusson, drummer David Antonsson, bassist Daniel Kristjansson, lead guitarist Rubin Pollock and harmonicist Þorleifur Gaukur Davíðsson. They have released three studio albums, Kaleo (2013), A/B (2016), and Surface Sounds (2021), as well as the EP Glasshouse (2013).\n\nA/B has sold over one million albums worldwide. Its second single, "Way Down We Go", was certified double platinum in the US and reached number one on the Billboard Alternative Songs chart on 20 August 2016. Kaleo received a Grammy Award nomination in 2017 for Best Rock Performance for the song "No Good".',
		genre: 'rock'
	}
} as Concert;

const concerts = [concert, concert2, concert, concert, concert, concert2];

const Home = () => {
	const ref = useRef<any>(null);
	const { addFavorite, removeFavorite } = useFavorites();

	const handleClick = () => {
		ref.current?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			<Box
				sx={{
					background: `url(${jumbotron_bg}), rgba(0, 0, 0, 0.5)`,
					backgroundBlendMode: 'multiply',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					height: 500
				}}
			>
				<Box
					display="flex"
					height="100%"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					sx={{ color: 'white' }}
				>
					<Typography variant="h1" style={{ fontWeight: 'bold' }}>
						LineUp
					</Typography>
					<Typography variant="h5">
						The best place to plan your festival season.
					</Typography>
					<Button
						variant="contained"
						color="secondary"
						size="large"
						sx={{ marginTop: 8 }}
						onClick={handleClick}
					>
						Take a look at the lineup
					</Button>
				</Box>
			</Box>
			<Container>
				<Stack
					direction={{ xs: 'column', md: 'row' }}
					spacing={2}
					sx={{ alignItems: 'center', justifyContent: 'center', my: 4 }}
				>
					<Countdown deadline={new Date(+new Date() + 123456789)} />
					<Typography
						variant="h3"
						style={{
							fontWeight: 'bold',
							paddingBottom: '0.4em'
						}}
					>
						until the start
					</Typography>
				</Stack>
				<Box my={4} display="flex" />
				<Box ref={ref}>
					<Typography variant="h2" my={4}>
						Headliners
					</Typography>
					<PerformersGrid concerts={concerts} />
				</Box>
				<Box my={4} display="flex" />
				<Box>
					<ConcertsTable concerts={concerts} />
				</Box>
			</Container>
		</>
	);
};

export default Home;
