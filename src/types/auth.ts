export default interface auth {
	authenticated: boolean,
	isLoading: boolean,
	user_id: string,
	first_name: string,
	last_name: string,
	email: string,
	api_key?: string
}
