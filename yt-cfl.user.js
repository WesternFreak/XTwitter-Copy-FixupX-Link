// ==UserScript==
// @name         X/Twitter - Copy FixupX Link
// @version      1.1.0
// @namespace    https://github.com/WesternFreak/XTwitter-Copy-FixupX-Link
// @description  Copies to the clipboard a FixupX link to the current tweet using a keyboard shortcut (CTRL+ALT+F) or a button.
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

const svg = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11M9 17H10M9 13H12M9 9H10M17.4976 15.7119C16.7978 14.9328 15.6309 14.7232 14.7541 15.4367C13.8774 16.1501 13.7539 17.343 14.4425 18.1868C14.8312 18.6632 15.7548 19.4983 16.4854 20.1353C16.8319 20.4374 17.0051 20.5885 17.2147 20.6503C17.3934 20.703 17.6018 20.703 17.7805 20.6503C17.9901 20.5885 18.1633 20.4374 18.5098 20.1353C19.2404 19.4983 20.164 18.6632 20.5527 18.1868C21.2413 17.343 21.1329 16.1426 20.2411 15.4367C19.3492 14.7307 18.1974 14.9328 17.4976 15.7119Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

function modifyUrl(url) {
    return url.replace('x.com', 'fixupx.com');
}

function copyToClipboard(text) {
    if (text) {
        GM_setClipboard(text);
        showPopup('FixupX link copied!');
    } else {
        showPopup('No URL to copy.');
    }
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.textContent = message;

    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
    popup.style.color = '#fff';
    popup.style.padding = '10px 20px';
    popup.style.borderRadius = '5px';
    popup.style.zIndex = '9999';
    popup.style.opacity = '1';
    popup.style.transition = 'opacity 0.5s ease';
    popup.style.fontFamily = 'Arial, sans-serif';
    popup.style.fontSize = 'large';

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 500);
    }, 1000);
}

function openAndCopyFixupXLink(tweet) {
    const tweetPath = tweet.querySelector('a:has(time)').getAttribute('href');
    const currentUrl = `https://x.com${tweetPath}`;
    const modifiedUrl = modifyUrl(currentUrl);
    copyToClipboard(modifiedUrl);
}

function designButton(tweet) {
    const group = tweet.querySelector('div[role="group"]');
    const shareButton = group.querySelector('button[aria-label="Share post"]');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('custom-fixupx-icon');
    buttonContainer.setAttribute('title', 'Copy FixupX Link');
    buttonContainer.style.cursor = 'pointer';

    const shareButtonStyle = getComputedStyle(shareButton);
    const buttonSize = parseFloat(shareButtonStyle.height);

    buttonContainer.style.height = buttonSize + 'px';
    buttonContainer.style.width = buttonSize + 'px';

    buttonContainer.style.display = 'flex';
    buttonContainer.style.alignItems = 'center';
    buttonContainer.style.justifyContent = 'center';

    const iconContainer = document.createElement('div');
    buttonContainer.appendChild(iconContainer);

    const iconCircleStyle = getComputedStyle(shareButton.firstChild.firstChild.firstChild);
    const iconCircleSize = parseFloat(iconCircleStyle.height);

    iconContainer.style.height = iconCircleSize + 'px';
    iconContainer.style.width = iconCircleSize + 'px';

    iconContainer.innerHTML = svg;
    const icon = iconContainer.querySelector('svg');

    const iconStyle = getComputedStyle(shareButton.querySelector('svg'));
    const iconSize = parseFloat(iconStyle.height);

    icon.style.height = iconSize + 'px';
    icon.style.width = iconSize + 'px';
    icon.style.padding = (iconCircleSize - iconSize) / 2 + 'px';
    icon.style.marginLeft = '5px';
    icon.style.marginRight = '5px';
    icon.style.borderRadius = '50%';

    const originalColor = iconStyle.color;
    icon.querySelector('path').style.stroke = originalColor;

    buttonContainer.addEventListener('mouseover', () => {
        icon.style.backgroundColor = 'rgba(29, 161, 242, 0.1)';
        icon.querySelector('path').style.stroke = 'rgba(29, 161, 242, 1)';
    });

    buttonContainer.addEventListener('mouseleave', () => {
        icon.style.backgroundColor = '';
        icon.querySelector('path').style.stroke = originalColor;
    });

    buttonContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        openAndCopyFixupXLink(tweet);
    });

    group.insertBefore(buttonContainer, shareButton.nextSibling);
}


function addNewFixupXButton() {
    const tweets = document.querySelectorAll('article[data-testid="tweet"]');
    tweets.forEach(tweet => {
        if (!tweet.querySelector('.custom-fixupx-icon')) {
            designButton(tweet);
        }
    });
}

(function() {
    'use strict';

    const observer = new MutationObserver(addNewFixupXButton);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.altKey && event.code === 'KeyF' && window.location.href.includes('status/')) {
            event.preventDefault();
            const currentUrl = window.location.href;
            const modifiedUrl = modifyUrl(currentUrl);
            copyToClipboard(modifiedUrl);
        }
    });
})();
