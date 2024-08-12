// Function to navigate to the root page of hall-monitor
function navigateToRootPage() {
    const rootUrl = "https://hall-monitor.int.clever.com";
    chrome.tabs.update({ url: rootUrl }, () => {
        console.log(`Navigating to root page: ${rootUrl}`);
    });
}

// Check the current tab's URL to ensure it's within the allowed domain
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    const allowedDomain = /https:\/\/hall-monitor\.int\.clever\.com/;
    
    if (!allowedDomain.test(currentTab.url)) {
        // If the current tab is not on hall-monitor.int.clever.com, navigate to the root page
        navigateToRootPage();
    } else {
        // If on the correct domain, initialize the popup as normal
        console.log("On hall-monitor.int.clever.com, initializing popup.");

        // Enable or disable buttons based on the input field value
        function updateButtonState() {
            const districtId = document.getElementById('districtId').value.trim();
            const buttons = [
                document.getElementById('navigateToPage'),
                document.getElementById('navigateToInfo'),
                document.getElementById('refreshSFTP')
            ];
            
            if (districtId) {
                buttons.forEach(button => button.disabled = false);
                document.getElementById('refreshSFTP').style.display = 'block';
            } else {
                buttons.forEach(button => button.disabled = true);
                document.getElementById('refreshSFTP').style.display = 'none';
            }
        }

        // Set up event listeners
        document.getElementById('districtId').addEventListener('input', updateButtonState);
        document.getElementById('navigateToPage').addEventListener('click', () => {
            const districtId = document.getElementById('districtId').value.trim();
            if (districtId) {
                const url = `https://hall-monitor.int.clever.com/districts/${districtId}/sftpfiles`;
                chrome.tabs.update(currentTab.id, { url }, () => {
                    console.log(`Navigating to SFTP page: ${url}`);
                });
            }
        });

        document.getElementById('navigateToInfo').addEventListener('click', () => {
            const districtId = document.getElementById('districtId').value.trim();
            if (districtId) {
                const url = `https://hall-monitor.int.clever.com/districts/${districtId}/info`;
                chrome.tabs.update(currentTab.id, { url }, () => {
                    console.log(`Navigating to Info page: ${url}`);
                });
            }
        });

        // Handle the "Refresh SFTP" button click
        document.getElementById('refreshSFTP').addEventListener('click', () => {
            const districtId = document.getElementById('districtId').value.trim();
            if (districtId) {
                const syncSettingsUrl = `https://hall-monitor.int.clever.com/districts/${districtId}/syncSettings`;
                chrome.tabs.update(currentTab.id, { url: syncSettingsUrl }, () => {
                    console.log(`Navigating to Sync Settings page: ${syncSettingsUrl}`);
                    
                    // Inject content script to extract SFTP information
                    chrome.tabs.executeScript(currentTab.id, { file: 'content.js' }, () => {
                        console.log("Injected content script to extract SFTP information.");
                    });
                });
            }
        });

        // Initialize the button state on popup load
        document.addEventListener('DOMContentLoaded', updateButtonState);
    }
});
