export type Stage = {
	name: string;
};

export const StageDetails = {
	cocacola: { name: 'Coca Cola Stage' },
	horalky: { name: 'Horalky Stage' },
	bluesoft: { name: 'Bluesoft Stage' }
};

export type Stages = keyof typeof StageDetails;
