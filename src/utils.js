export const createSlug = (Text) => {
	return Text
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
		;
}