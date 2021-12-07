const axios = require('axios').default;

// Additional headers can be passed as a fourth argument of ajaxPromisify.
// The authentication credentials (technical user name & password) could potentially be set as header.
var ajaxPromisify = (url, type, data, headers) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url,
			type,
			data,
			contentType: 'application/json',
			headers,
			// xhrFields: {
			//   withCredentials: true
			// },
			crossDomain: true,
			success: function (response, status, xhr) {
				resolve({
					response,
					status,
					xhr
				})
			},
			error: function (response, status, xhr) {
				const err = new Error('xhr error')
				err.status = xhr.status
				reject(err)
			}
		})
	})
}

const SERVICE_END_POINT = 'https://customersuccessmarketstandard-dev-cap-sac-scopebundle-approuter.cfapps.eu10.hana.ondemand.com';

(function () {
	const template = document.createElement('template')
	template.innerHTML = `
		<style>
		</style>
		<div id="root" style="width: 100%; height: 100%;">
		</div>
	  `
	class MainWebComponent extends HTMLElement {
		/* paths for get method:
		 - Read all ScopeBundles: /service/ScopeBundle
		 - Read single ScopeBundle: /service/ScopeBundle(ScopeBundleID=10005678-90ab-cdef-1234-567890abcdef)
		 */
		async get(path, payload) {
			const {
				response
			} = await ajaxPromisify(`${SERVICE_END_POINT}${path}`, 'GET', payload)
			return response;
		}

		/* paths for post method:
		 - Create ScopeBundle: /service/ScopeBundle
		 - Create ScopeBundleScenario: /service/ScopeBundle(ScopeBundleID=10005678-90ab-cdef-1234-567890abcdef)/_ScopeBundleScenario
		 */
		async post(path, payload) {
			const {
				response
			} = await ajaxPromisify(`${SERVICE_END_POINT}${path}`, 'POST', payload)
			return response.statusCode
		}

		async postAxios(path, payload) {
			var responseObject;
			try {
				// var authString = "Basic " + Buffer.from(email + ":" + password).toString('base64');
				const requestionOptions = {
					method: 'POST',
					url: `${SERVICE_END_POINT}${path}`,
					headers: {
						//'Authorization': authString,
						'Content-type': 'application/json'
					},
					data: payload
				};

				const response = await axios(requestionOptions);
				responseObject = {
					data: response.data,
					status: response.status
				}
			} catch (error) {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log("error.response.status", error.response.status);
					console.log("error.response.data", error.response.data);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log("error.request", error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', error.message);
				}
				//console.log("error.config", error.config);
			}

			return responseObject;
		};
	}


	customElements.define('com-sap-standard-content-scopebundleapi', MainWebComponent)
})()