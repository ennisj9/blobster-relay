const axios = require('axios');

const blobsterURL = process.env.BLOBSTER_HOST ?? 'http://localhost:8108';

const submitBlob = async () => {
	try {
		await axios.post(blobsterURL + '/blob', {
			blob: {hello: 'world'},
			label: Math.random().toString(36).substr(8)
		});
	} catch(e) {
		console.error(e.message);
	}
	
}
setInterval(submitBlob, 5000);