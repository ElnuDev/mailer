window.onload = () => {
	form = document.querySelector("form");
	submit = document.querySelector("input[type=submit]");
	const submitText = submit.value;
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		var data = "";
		for (var i = 0; i < form.children.length; i++) {
			const element = form.children[i];
			if (i > 0) {
				data += "&";
			}
			if (element.hasAttribute("name")) {
				data += `${element.name}=${element.value}`;
			}
		}
		const http = new XMLHttpRequest();
		http.open("POST", "http://127.0.0.1:8080", true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.onreadystatechange = () => {
			if (http.readyState == 4 && http.status == 200) {
				form.reset();
				resetSubmit();
				clearTimeout(failTimeout);
				alert("Form submitted successfully");
			}
		}
		http.send(data);
		submit.disabled = true;
		submit.value = "Sending...";
		const resetSubmit = () => {
			submit.disabled = false;
			submit.value = submitText;
		};
		const failTimeout = setTimeout(() => {
			resetSubmit();
			alert("Form submission failed")
		}, 5000);
	});
};