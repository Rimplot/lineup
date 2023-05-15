import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | Lineup`;
	}, [title]);
};

export default usePageTitle;
