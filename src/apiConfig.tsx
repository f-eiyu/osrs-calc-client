let apiUrl: string;
const apiUrls = {
    // change for deployment
	production: '<replace_with_deployed_api_url>',
	development: 'http://localhost:8000',
};

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development;
} else {
	apiUrl = apiUrls.production;
}

export default apiUrl;