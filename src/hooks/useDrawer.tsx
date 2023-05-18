import { useState } from 'react';

const useDrawer = () => {
	const [detailsOpen, setDetailsOpen] = useState(false);

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setDetailsOpen(open);
		};

	return { detailsOpen, toggleDrawer };
};

export default useDrawer;
