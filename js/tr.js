(function() {
	let API_KEY = "sdqupwhg51c0o4ww488w40og4kkog8s";

  function resolveInternals(spec) {
		// extract the proper shortname
		spec.shortname = spec.shortlink.match("https?://www.w3.org/TR/([^/]+)/");

		return fetch(spec._links.deliverers.href+ "?apikey=" + API_KEY, {
			'mode': 'cors'
		}).then(res => {
			if (res.ok) return  res.json();
		  throw new Error("Specification not found for " + shortname);
		}).then(deliverers => {
			spec._deliverers = deliverers._links.deliverers;
      return spec;
		}).then(spec => {
			let length = spec._deliverers.length;
			let index = 0;
			spec.groups = [];
			function fetchGroup() {
				// avoid looking at submissions
				if ((index < length) && (spec._deliverers[index].title !== "UNKNOWN WORKING GROUP")) {
				  return fetch(spec._deliverers[index].href+ "?apikey=" + API_KEY, {
						'mode': 'cors'
					}).then(res => {
						if (res.ok) return  res.json();
						throw new Error("Specification not found for " + shortname);
					}).then(deliverer => {
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

	function findLatest(shortname) {
		return fetch("https://api.w3.org/specifications/" + shortname + "/versions/latest?apikey=" + API_KEY, {
			'mode': 'cors'
			}).then(res => {
				if (res.ok) return  res.json();
				throw new Error("Specification not found for " + shortname);
		  })
			.then(resolveInternals);
	}

	function findOptions(shortname) {
		return fetch("https://api.w3.org/specifications-by-shortname/" + shortname + "?apikey=" + API_KEY, {
			'mode': 'cors'
			}).then(res => {
				if (res.ok) return  res.json();
				throw new Error("Specification not found for " + shortname);
		  })
			.then(data => {
				return (data.total > 0)?
				  data._links.specifications.map(s => s.href.substring("https://api.w3.org/specifications/".length))
				  : [];
			});
	}


  window.w3c_tr = {};
  window.w3c_tr.findLatest = findLatest;
  window.w3c_tr.findOptions = findOptions;
})();
