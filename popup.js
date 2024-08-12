document.getElementById('navigateToPage').addEventListener('click', () => {
    const districtId = document.getElementById('districtId').value.trim();
    if (districtId) {
        const url = `https://hall-monitor.int.clever.com/districts/${districtId}/sftpfiles`;
        chrome.tabs.create({ url });
    }
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    const regex = /https:\/\/hall-monitor\.int\.clever\.com\/districts\/([a-z0-9]+)\//;
    const match = currentTab.url.match(regex);
    if (match) {
        document.getElementById('downloadFiles').style.display = 'block';
        document.getElementById('navigateToPage').style.display = 'none';

        document.getElementById('downloadFiles').addEventListener('click', () => {
            chrome.tabs.sendMessage(currentTab.id, { action: 'downloadFiles' });
        });
    }
});
