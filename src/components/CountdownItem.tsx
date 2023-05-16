type CountdownItemProps = {
	label: string;
	value: number;
};

const CountdownItem = ({ label, value }: CountdownItemProps) => (
	<div className="counter-item">
		<span className="value">{String(value).padStart(2, '0')}</span>
		<span className="label">{label}</span>
	</div>
);

export default CountdownItem;
