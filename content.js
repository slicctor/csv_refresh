// Function to simulate a click on a download button
function triggerDownload() {
    const downloadButton = document.querySelector("#downloadButton");

    if (downloadButton) {
        downloadButton.click();
        console.log("Download button clicked.");
    } else {
        console.error("Download button not found.");
    }
}

// Function to extract information from the web page to be used in renaming the file
function extractFileInfo() {
    const infoElement = document.querySelector("#infoElement");

    if (infoElement) {
        let extractedInfo = infoElement.textContent.trim();
        console.log("Extracted info:", extractedInfo);

        // Send the extracted information to the background script
        chrome.runtime.sendMessage({ action: "renameFile", info: extractedInfo });
    } else {
        console.error("Info element not found.");
    }
}

// Listen for messages from the background script or popup to start the process
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startProcessing") {
        // Extract necessary information from the page
        extractFileInfo();

        // Trigger the download
        triggerDownload();

        // Optional: Send a response back to the sender
        sendResponse({ status: "Processing started" });
    }
});

// Automatically run the script when the content script is injected
extractFileInfo();
triggerDownload();
