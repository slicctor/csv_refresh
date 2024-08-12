chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'downloadFiles') {
        // Assuming the download button exists on the page, we can simulate a click
        const downloadButton = document.querySelector("#downloadButton"); // Update this selector as per your page's actual download button
        if (downloadButton) {
            downloadButton.click();
            sendResponse({ status: 'Downloading' });
        } else {
            sendResponse({ status: 'Download button not found' });
        }
    }
});
