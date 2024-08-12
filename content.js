// Function to download the schools.csv file
function downloadSchoolsCSV() {
    // Locate the specific row containing the schools.csv link
    const row = document.querySelector('tr.Table--row'); // Adjust this if there are multiple rows, use a more specific selector or loop through rows
    
    if (row) {
        const linkElement = row.querySelector('a[href*="schools.csv"]');
        
        if (linkElement) {
            // Extract the href attribute (the S3 link)
            const s3Link = linkElement.getAttribute('href');
            
            if (s3Link) {
                // Construct the full URL if the link is relative
                const fullURL = `https://hall-monitor.int.clever.com${s3Link}`;
                
                // Trigger the download
                window.location.href = fullURL;
                console.log(`Downloading schools.csv from: ${fullURL}`);
            } else {
                console.error("No S3 link found for schools.csv");
            }
        } else {
            console.error("No link found for schools.csv");
        }
    } else {
        console.error("No table row found");
    }
}

// Listen for the downloadFiles action from the background or popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'downloadFiles') {
        downloadSchoolsCSV();
        sendResponse({ status: 'Downloading schools.csv' });
    }
});
