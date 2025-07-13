
const _0x3b3619 = _0x5511; // এটার মধ্যে সংস্কার পড়ুন
function _0x5511(_0x53a93d, _0x21a578) {
    const _0x47c238 = _0x23bd();
    return _0x5511 = function(_0x258893, _0x2160a6) {
        _0x258893 = _0x258893 - (0x1278 + 0x1 * -0x2171 + 0x1003);
        let _0x3bf7de = _0x47c238[_0x258893];
        return _0x3bf7de;
    }, _0x5511(_0x53a93d, _0x21a578);
}

(function(_0x4533c8, _0x2b5b1e) {
    const _0x534c65 = _0x5511,
        _0x585bdd = _0x4533c8();
    while (!![]) {
        try {
            const _0x50022b = parseInt(_0x534c65(0x18e)) / (-0x1160 + -0x26e5 + 0x3846) + 
                parseInt(_0x534c65(0x12f)) / (-0x1ef5 * 0x1 + -0x153c + 0x7 * 0x775) + 
                parseInt(_0x534c65(0x164)) / (0x1 * 0x2f3 + -0xfe1 + 0xcf1) *
                (parseInt(_0x534c65(0x169)) / (-0x16da + 0x138e + 0x350)) +
                -parseInt(_0x534c65(0x11b)) / (0x26e0 + -0x49 * 0x61 + 0x2 * -0x599) *
                (parseInt(_0x534c65(0x114)) / (-0x27 * 0x21 + -0x1b5 * 0xa + -0xc11 * -0x1)) +
                parseInt(_0x534c65(0x175)) / (0x18 * 0x111 + -0xfe9 + 0x19c * -0x6) +
                parseInt(_0x534c65(0x167)) / (0xf1b + -0xe06 + -0x10d) *
                (parseInt(_0x534c65(0x199)) / (-0x9ed + 0x2605 * -0x1 + 0x2ffb)) +
                -parseInt(_0x534c65(0x1b1)) / (0x2395 + 0x1e47 + -0x41d2);
            if (_0x50022b === _0x2b5b1e) break; 
            else _0x585bdd['push'](_0x585bdd['shift']());
        } catch (_0x46ae90) {
            _0x585bdd['push'](_0x585bdd['shift']());
        }
    }
}(_0x23bd, 0x166a + -0x87eca + -0x29fa1 * -0x5), module[_0x3b3619(0x1ce)][_0x3b3619(0x10c)] = {
    'name': _0x3b3619(0x178),
    'version': _0x3b3619(0x11c),
    'hasPermission': 0x0,
    'credits': _0x3b3619(0x13f) + _0x3b3619(0x18c),
    'description': _0x3b3619(0x15b) + _0x3b3619(0x10d) + 
                   _0x3b3619(0x145) + _0x3b3619(0x1bc) +
                   _0x3b3619(0x1a8) + _0x3b3619(0x155) + '!',
    'commandCategory': _0x3b3619(0x1b9),
    'countDown': 0x3
}, module[_0x3b3619(0x1ce)][_0x3b3619(0x16a)] = async ({ api: _0x4cee77 }) => {
    const _0x20aeb4 = _0x3b3619,
        _0x13b88e = {
            'sendMessage': async function(_0x44d7bd, _0x49e876) {
                return _0x4cee77.sendMessage(_0x44d7bd, _0x49e876);
            },
            // Update the messages and URLs for new prayer times
            'timings': {
                '05:35 AM': {
                    'message': 'ফজরের আজান হয়েছে সাবা, সবাই নামাজের জন্য প্রস্তুতি নিয়ে আসুন!',
                    'url': 'https://link-to-fajr-azan.mp3'
                },
                '01:00 PM': {
                    'message': 'যোহরের আজান হবে, প্রস্তুতি নিয়ে আসুন!',
                    'url': 'https://link-to-dhuhr-azan.mp3'
                },
                '04:30 PM': {
                    'message': 'আসর আজান হবে, প্রস্তুতি নিয়ে আসুন!',
                    'url': 'https://link-to-asr-azan.mp3'
                },
                '07:05 PM': {
                    'message': 'মাগরিব আজান হবে, প্রস্তুতি নিয়ে আসুন!',
                    'url': 'https://link-to-maghrib-azan.mp3'
                },
                '08:15 PM': {
                    'message': 'এশা আজান হবে, প্রস্তুতি নিয়ে আসুন!',
                    'url': 'https://link-to-isha-azan.mp3'
                }
            }
        },
        currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    if (_0x13b88e.timings[currentTime]) {
        const { message, url } = _0x13b88e.timings[currentTime];
        console.log(message);
        console.log(url);
        try {
            let attachment = await require('axios').get(url, { responseType: 'arraybuffer' });
            global['api'].sendMessage({ body: message, attachment });
        } catch (error) {
            console.error('Failed to send message for ' + currentTime + ':', error);
        }
    }

    // Call the function again after a specific timeout
    setTimeout(() => { /* function call for the next time */ }, 60000); // Check every minute
}, module[_0x3b3619(0x1ce)][_0x3b3619(0x112)] = ({}) => {});
```
