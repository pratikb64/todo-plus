export default interface auth {
	authenticated: boolean,
	user_id: string,
	first_name: string,
	last_name: string,
	email: string,
	api_key?: string
}
