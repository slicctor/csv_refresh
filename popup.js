document.getElementById('startProcess').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startProcessing' }, response => {
        console.log(response.status);
    });
});
