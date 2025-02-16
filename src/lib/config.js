export const SITE_CONFIG = {
	API_ROOT: "https://api.legitimoose.net/",
	MCAUTH: {
		CLIENT_ID: "3547604672392987797",
		REDIRECT_URI: "http://localhost:5173/profile/login",
	},
};

export const STATUS_CHECKING_CONFIG = {
	MILLISECONDS_TIL_NEXT_FETCH: 900000, // 15min = 900000ms
	API_WARNING_TIME: 5000, // Time until status checker states that API status is 1 (warning)
	DEFAULT_CONTENT: { api: [], scraper: [] },
	MAX_LENGTH_UNTIL_DATA_REMOVAL: 100,
};