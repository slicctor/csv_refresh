chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'uploadFile') {
        fetch('https://csv-refresh.vercel.app/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                host: request.host,
                port: request.port,
                username: request.username,
                password: request.password,
                remotePath: request.remotePath,
                fileContent: request.fileContent // Base64 encoded file content
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            sendResponse({ status: 'success', data });
        })
        .catch(error => {
            console.error('Error:', error);
            sendResponse({ status: 'error', error });
        });
    }
    return true;  // Required for async sendResponse
});
