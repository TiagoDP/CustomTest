// Additional headers can be passed as a fourth argument of ajaxPromisify.
// The authentication credentials (technical user name & password) could potentially be set as header.
var ajaxPromisify = (url, type, data, headers) => {
	$.ajax({
		url,
		type,
		data,
		headers,
		success: function (response) {
			return response;
		},
		error: function (error) {
			console.log(error);
		}
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
			} = ajaxPromisify(`${SERVICE_END_POINT}${path}`, 'GET', data, {'Content-type': 'application/json'})
			return response;
		}

		/* paths for post method:
		 - Create ScopeBundle: /service/ScopeBundle
		 - Create ScopeBundleScenario: /service/ScopeBundle(ScopeBundleID=10005678-90ab-cdef-1234-567890abcdef)/_ScopeBundleScenario
		 */
		async post(path, data) {
			const {
				response
			} = ajaxPromisify(`${SERVICE_END_POINT}${path}`, 'POST', data, {'Content-type': 'application/json'})
			return response.statusCode
		}
	}

	customElements.define('com-sap-standard-content-scopebundleapi', MainWebComponent)
})()
