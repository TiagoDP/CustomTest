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
		async get(path, data) {
			const {
				response
			} = await ajaxPromisify(`${SERVICE_END_POINT}${path}`, 'GET', data)
			return response;
		}

		/* paths for post method:
		 - Create ScopeBundle: /service/ScopeBundle
		 - Create ScopeBundleScenario: /service/ScopeBundle(ScopeBundleID=10005678-90ab-cdef-1234-567890abcdef)/_ScopeBundleScenario
		 */
		async post(path, data) {
			const {
				response
			} = await ajaxPromisify(`${SERVICE_END_POINT}${path}`, 'POST', data)
			return response.statusCode
		}
	}

	customElements.define('com-sap-standard-content-scopebundleapi', MainWebComponent)
})()