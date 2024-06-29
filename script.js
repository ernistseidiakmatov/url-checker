
const input = document.querySelector("input");
const log = document.getElementById("url-input");
let timeoutId = null;
let currentUrl = null;

input.addEventListener("input", checkUrlExistence);

// main function that checks if url is valid and makes server call
function checkUrlExistence() {
    const response = document.getElementById("server-response");
    const url = log.value;

    if (isValidURL(url)) {
        response.innerHTML = "<span style='color: orange;'>Checking URL existence...</span>";
        currentUrl = url;

        // Clear the previous timeout if it exists
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set a new timeout
        timeoutId = setTimeout(() => {
            simulateServerRequest(url)
                .then((result) => {
                    // Check if the URL is still the same
                    if (url === currentUrl) {
                        if (result.exists) {
                            response.innerHTML = `<span style='color: green;'><a href="${url}">[${url}]</a> - exists and it is a ${result.type}</span>`;
                        } else {
                            response.innerHTML = "<span style='color: red;'>URL does not exist</span>";
                        }
                    }
                })
                .catch((error) => {
                    if (url === currentUrl) {
                        response.innerHTML = "<span style='color: red;'>Error occurred while checking URL existence</span>";
                        console.error(error);
                    }
                });
        }, 1000);
    } else {
        response.innerHTML = "<span style='color: red;'>URL is not valid</span>";
    }
}


// url is valid only if its protocol is http or https
function isValidURL(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(url);
}



// Simulating the server request with a setTimeout
function simulateServerRequest(url) {
	console.log(url, "is recived by server")
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const randomNumber = Math.random();
			if (randomNumber < 0.5) {
				resolve({ exists: true, type: "folder" });
			} else {
				resolve({ exists: true, type: "file" });
			}
		}, 1000);
	});
}

