// ==UserScript==
// @name         YouTube - Copy FixupX Link
// @version      1.0.0
// @namespace    https://github.com/WesternFreak/XTwitter-Copy-FixupX-Link
// @description  Copies to the clipboard a FixupX link to the current tweet using a keyboard shortcut (CTRL+ALT+F).
// @icon         https://raw.githubusercontent.com/WesternFreak/XTwitter-Copy-FixupX-Link/main/img/icon.png
// @author       WesternFreak
// @homepage     https://github.com/WesternFreak/XTwitter-Copy-FixupX-Link
// @updateURL    https://github.com/WesternFreak/XTwitter-Copy-FixupX-Link/raw/main/yt-cfl.user.js
// @downloadURL  https://github.com/WesternFreak/XTwitter-Copy-FixupX-Link/raw/main/yt-cfl.user.js
// @supportURL   https://github.com/WesternFreak/XTwitter-Copy-FixupX-Link/issues
// @match        https://x.com/*
// @grant        GM_setClipboard
// @grant        GM_notification
// @license      MIT License
// ==/UserScript==

(function() {
    'use strict';

    const modifyUrl = (url) => url.replace('x.com', 'fixupx.com');

    const copyToClipboard = (text) => {
        if (text) {
            GM_setClipboard(text);
            showPopup('FixupX link copied!');
        } else {
            showPopup('No URL to copy.');
        }
    };

    // Creates and displays a custom popup at the top of the screen
    const showPopup = (message) => {
        const popup = document.createElement('div');
        popup.textContent = message;

        // Style the popup
        popup.style.position = 'fixed';
        popup.style.top = '20px';
        popup.style.left = '50%';
        popup.style.transform = 'translateX(-50%)';
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.45)'
        popup.style.color = '#fff';
        popup.style.padding = '10px 20px';
        popup.style.borderRadius = '5px';
        popup.style.zIndex = '9999';
        popup.style.opacity = '1';
        popup.style.transition = 'opacity 0.5s ease';
        popup.style.fontFamily = 'Arial, sans-serif';
        popup.style.fontSize = 'large';

        document.body.appendChild(popup);

      // Fade out the popup
        setTimeout(() => {
            popup.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(popup);
            }, 500);
        }, 1000);
    };

    // Handles keydown events to trigger the URL copy
    const handleKeydown = (event) => {
        // Check for CTRL + LEFT ALT + F and ensure "status/" is in the URL
        if (event.ctrlKey && event.altKey && event.code === 'KeyF' && window.location.href.includes('status/')) {
            event.preventDefault(); // Prevent default behavior
            const currentUrl = window.location.href;
            const modifiedUrl = modifyUrl(currentUrl);
            copyToClipboard(modifiedUrl);
        }
    };

    // Add event listener for keydown events
    document.addEventListener('keydown', handleKeydown);
})();
