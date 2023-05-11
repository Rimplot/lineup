import { FC } from 'react';
import { Formik, FormikProps, Form, Field } from 'formik';
import { Timestamp } from 'firebase/firestore';

type ConcertFormValues = {
	artistName: string;
	shortDescription: string;
	fullDescription: string;
	imageUrl: string;
	date: Timestamp;
	stage: string;
};

const ConcertForm: FC = () => {
	const initialValues: ConcertFormValues = {
		artistName: '',
		shortDescription: '',
		fullDescription: '',
		imageUrl: '',
		date: Timestamp.now(),
		stage: ''
	};

	return (
		<div>
			<h1>Add Concert</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={(values, actions) => {
					console.log({ values, actions });
					alert(JSON.stringify(values, null, 2));
					actions.setSubmitting(false);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting
				}: FormikProps<ConcertFormValues>) => (
					<Form onSubmit={handleSubmit}>
						<label htmlFor="artistName">Artist Name</label>
						<Field
							id="artistName"
							name="artistName"
							placeholder="Artist Name"
						/>
						{errors.artistName && touched.artistName && (
							<div>{errors.artistName}</div>
						)}

						<label htmlFor="shortDescription">Short Description</label>
						<Field
							id="shortDescription"
							name="shortDescription"
							placeholder="Short Description"
						/>
						{errors.shortDescription && touched.shortDescription && (
							<div>{errors.shortDescription}</div>
						)}

						<label htmlFor="fullDescription">Full Description</label>
						<Field
							id="fullDescription"
							name="fullDescription"
							placeholder="Full Description"
						/>
						{errors.fullDescription && touched.fullDescription && (
							<div>{errors.fullDescription}</div>
						)}

						<label htmlFor="imageUrl">Image URL</label>
						<Field id="imageUrl" name="imageUrl" placeholder="Image URL" />
						{errors.imageUrl && touched.imageUrl && (
							<div>{errors.imageUrl}</div>
						)}

						{/* <label htmlFor="date">Date</label>
						<Field id="date" name="date" type="date" placeholder="Date" />
						{errors.date && touched.date && <div>{errors.date >> .toDate()}</div>} */}

						<label htmlFor="stage">Stage</label>
						<Field id="stage" name="stage" placeholder="Stage" />
						{errors.stage && touched.stage && <div>{errors.stage}</div>}

						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ConcertForm;
