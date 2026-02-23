'use strict';

var core = require('@capacitor/core');

exports.BackgroundColor = void 0;
(function (BackgroundColor) {
    BackgroundColor["WHITE"] = "white";
    BackgroundColor["BLACK"] = "black";
})(exports.BackgroundColor || (exports.BackgroundColor = {}));
exports.ToolBarType = void 0;
(function (ToolBarType) {
    /**
     * Shows a simple toolbar with just a close button and share button
     * @since 0.1.0
     */
    ToolBarType["ACTIVITY"] = "activity";
    /**
     * Shows a simple toolbar with just a close button
     * @since 7.6.8
     */
    ToolBarType["COMPACT"] = "compact";
    /**
     * Shows a full navigation toolbar with back/forward buttons
     * @since 0.1.0
     */
    ToolBarType["NAVIGATION"] = "navigation";
    /**
     * Shows no toolbar
     * @since 0.1.0
     */
    ToolBarType["BLANK"] = "blank";
})(exports.ToolBarType || (exports.ToolBarType = {}));
exports.InvisibilityMode = void 0;
(function (InvisibilityMode) {
    /**
     * WebView is aware it is hidden (dimensions may be zero).
     */
    InvisibilityMode["AWARE"] = "AWARE";
    /**
     * WebView is hidden but reports fullscreen dimensions (uses alpha=0 to remain invisible).
     */
    InvisibilityMode["FAKE_VISIBLE"] = "FAKE_VISIBLE";
})(exports.InvisibilityMode || (exports.InvisibilityMode = {}));

const InAppBrowser = core.registerPlugin('InAppBrowser', {
    web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.InAppBrowserWeb()),
});

class InAppBrowserWeb extends core.WebPlugin {
    clearAllCookies() {
        console.log('clearAllCookies');
        return Promise.resolve();
    }
    clearCache() {
        console.log('clearCache');
        return Promise.resolve();
    }
    async open(options) {
        console.log('open', options);
        return options;
    }
    async clearCookies(options) {
        console.log('cleanCookies', options);
        return;
    }
    async getCookies(options) {
        // Web implementation to get cookies
        return options;
    }
    async openWebView(options) {
        console.log('openWebView', options);
        return options;
    }
    async executeScript({ code }) {
        console.log('code', code);
        return code;
    }
    async close() {
        console.log('close');
        return;
    }
    async hide() {
        console.log('hide');
        return;
    }
    async show() {
        console.log('show');
        return;
    }
    async setUrl(options) {
        console.log('setUrl', options.url);
        return;
    }
    async reload() {
        console.log('reload');
        return;
    }
    async postMessage(options) {
        console.log('postMessage', options);
        return options;
    }
    async goBack() {
        console.log('goBack');
        return;
    }
    async getPluginVersion() {
        return { version: 'web' };
    }
    async updateDimensions(options) {
        console.log('updateDimensions', options);
        // Web platform doesn't support dimension control
        return;
    }
    async openSecureWindow(options) {
        const w = 600;
        const h = 550;
        const settings = [
            ['width', w],
            ['height', h],
            ['left', screen.width / 2 - w / 2],
            ['top', screen.height / 2 - h / 2],
        ]
            .map((x) => x.join('='))
            .join(',');
        const popup = window.open(options.authEndpoint, 'Authorization', settings);
        if (typeof popup.focus === 'function') {
            popup.focus();
        }
        return new Promise((resolve, reject) => {
            const bc = new BroadcastChannel(options.broadcastChannelName || 'oauth-channel');
            bc.addEventListener('message', (event) => {
                if (event.data.startsWith(options.redirectUri)) {
                    bc.close();
                    resolve({ redirectedUri: event.data });
                }
                else {
                    bc.close();
                    reject(new Error('Redirect URI does not match, expected ' + options.redirectUri + ' but got ' + event.data));
                }
            });
            setTimeout(() => {
                bc.close();
                reject(new Error('The sign-in flow timed out'));
            }, 5 * 60000);
        });
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    InAppBrowserWeb: InAppBrowserWeb
});

exports.InAppBrowser = InAppBrowser;
//# sourceMappingURL=plugin.cjs.js.map
