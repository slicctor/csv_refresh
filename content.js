// Function to extract SFTP information from the syncSettings page
function extractSftpInfo() {
    const urlElement = document.getElementById('syncURL');
    const usernameElement = document.getElementById('syncUsername');
    const passwordElement = document.getElementById('password');

    if (urlElement && usernameElement && passwordElement) {
        const sftpUrl = urlElement.value;
        const sftpUsername = usernameElement.value;
        const sftpPassword = passwordElement.value;

        console.log(`SFTP URL: ${sftpUrl}`);
        console.log(`SFTP Username: ${sftpUsername}`);
        console.log(`SFTP Password: ${sftpPassword}`);

        // Send the extracted data back to the background or popup script
        chrome.runtime.sendMessage({
            action: 'sftpInfoExtracted',
            data: {
                url: sftpUrl,
                username: sftpUsername,
                password: sftpPassword
            }
        });
    } else {
        console.error("Failed to find SFTP information elements on the page.");
    }
}

// Function to download all schools.csv files found in the table
function downloadSchoolsCSV() {
    const rows = document.querySelectorAll('tr.Table--row');
    let fileFound = false;

    rows.forEach(row => {
        const linkElement = row.querySelector('a[href*="schools.csv"]');
        if (linkElement) {
            const s3Link = linkElement.getAttribute('href');
            if (s3Link) {
                const fullURL = `https://hall-monitor.int.clever.com${s3Link}`;
                console.log(`Downloading schools.csv from: ${fullURL}`);
                window.open(fullURL, '_blank'); // Open the download link in a new tab to trigger the download
                fileFound = true;
            }
        }
    });

    if (!fileFound) {
        console.error("No schools.csv files found in the table.");
    }
}

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'downloadFiles') {
        console.log("Download request received, attempting to download schools.csv files...");
        downloadSchoolsCSV();
        sendResponse({ status: 'Attempting to download schools.csv files' });
    } else if (request.action === 'extractSftpInfo') {
        console.log("Extract SFTP information request received...");
        extractSftpInfo();
        sendResponse({ status: 'SFTP information extracted' });
    }
});
