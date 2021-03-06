import superagent from 'superagent/lib/client';

/**
 * Simple helper module to make HTTP requests.
 */
export default {
	get:  request.bind(null, superagent.get),
	put:  request.bind(null, superagent.put),
	del:  request.bind(null, superagent.del),
	post: request.bind(null, superagent.post)
}

/**
 * Simple helper function to make HTTP requests. Note that you don't call this
 * directly but instead use one of the pre-bound methods above.
 */
function request(to, options = {}) {
	return new Promise((resolve, reject) => {
		let request = to(options.url)
			.set('Accept',        'application/json')
			.set('Content-Type',  'application/json')
			.set('Authorization', `Bearer ${options.token}`);
		if(options.payload) {
			request = request.send(options.payload)
		}
		return request.end((err, res) => {
			if(err) {
				err.statusCode = err.status || res ? res.status : 0;
				return reject(err);
			}
			return resolve({ body: res.body, headers: res.headers });
		});






		// let requestOptions = {
		// 	withCredentials: false,
		// 	headers: {
		// 		'Accept':        'application/json',
		// 		'Content-Type':  'application/json',
		// 		'Authorization': `Bearer ${options.token}`
		// 	},
		// 	url:  options.url,
		// 	body: options.payload ? JSON.stringify(options.payload) : null
		// }
		// requestMethod(requestOptions, (err, res, body) => {
		// 	if(err) {
		// 		return reject(err);
		// 	}
		// 	if(res.statusCode === 0 || res.statusCode >= 400) {
		// 		var error            = new Error(res.message);
		// 		    error.statusCode = res.statusCode;
		// 		return reject(error);
		// 	}
		// 	if(res.headers['content-type'].includes('application/json')) {
		// 		body = JSON.parse(body);
		// 	}
		// 	return resolve({ body, headers: res.headers });
		// });
	});
}
