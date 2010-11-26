/*

The MIT License

Copyright (c) 2010 Norio Nomura

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

if (window.top === window) {
    (function (scriptFileName) {
        var handleLoad = function (evt) {
            if (evt.target.nodeName === 'SCRIPT') {
                if (/^https:.*\/phoenix\.bundle\.js/.test(evt.target.src)) {
                    var script = window.document.createElement('script');
                    if (typeof(safari) !== 'undefined') {
                        script.src = safari.extension.baseURI + scriptFileName;
                    } else if (typeof(chrome) !== 'undefined') {
                        script.src = chrome.extension.getURL(scriptFileName);
                    }
                    window.document.removeEventListener("load", handleLoad, true);
                    window.document.head.appendChild(script);
                    delete handleLoad;
                }
            }
        };
        window.document.addEventListener("load", handleLoad, true);
    })('twttr.media.types.instagram.js');
}
