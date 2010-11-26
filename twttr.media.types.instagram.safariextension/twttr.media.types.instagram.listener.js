/*

The MIT License

Copyright (c) 2010 Norio Nomura

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

if (window.top === window) {
    (function () {
        function getObjectFromGlobal(message) {
            var a = function (countDown) {
                var div = window.document.getElementById(message.id);
                if (div) {
                    div.innerHTML = message.innerHTML;
                    delete a;
                } else if (countDown === 0) {
                    delete a;
                } else {
                    window.setTimeout(a, 100, --countDown);
                }
            };
            a(10);
        }
        
        var sendObjectToGlobal, port;
        
        if (typeof(safari) !== 'undefined') {
            sendObjectToGlobal = function (obj) {
                    safari.self.tab.dispatchMessage('twttr.media.types.instagram', obj);
                };
            safari.self.addEventListener('message', function (eventMessage) {
                    getObjectFromGlobal(eventMessage.message);
                }, false);
        } else if (typeof(chrome) !== 'undefined') {
            port = chrome.extension.connect({'name': 'twttr.media.types.instagram'});
            port.onMessage.addListener(getObjectFromGlobal);
            sendObjectToGlobal = function (obj) {
                    port.postMessage(obj);
                };
        }
        
        window.document.addEventListener('twttr.media.types.instagram', function (evt) {sendObjectToGlobal(evt.detail);}, true);
    })();
}
