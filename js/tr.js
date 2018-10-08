(function() {
	 let API_KEY = "sdqupwhg51c0o4ww488w40og4kkog8s";

   function findLatest(shortname) {
		return fetch("https://api.w3.org/specifications/" + shortname + "/versions/latest?apikey=" + API_KEY).then(res => res.json())
			.then(spec => {
        // extract the proper shortname
        spec.shortname = spec.shortlink.match("https?://www.w3.org/TR/([^/]+)/");

				return fetch(spec._links.deliverers.href+ "?apikey=" + API_KEY).then(res => res.json()).then(deliverers => {
					spec._deliverers = deliverers._links.deliverers;
					return spec;
				});
			}).then(spec => {
				let length = spec._deliverers.length;
				let index = 0;
				spec.groups = [];
				function fetchGroup() {
					// avoid looking at submissions
					if ((index < length) && (spec._deliverers[index].title !== "UNKNOWN WORKING GROUP")) {
  				  return fetch(spec._deliverers[index].href+ "?apikey=" + API_KEY).then(res => res.json()).then(deliverer => {
						  spec.groups[index++] = deliverer;
					    return fetchGroup();
				    });
					} else {
						return spec;
					}
				}
				return fetchGroup();
			});
	}

  window.w3c_tr = {};
  window.w3c_tr.findLatest = findLatest;
})();
