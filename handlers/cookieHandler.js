function setCookie(cname, cvalue) {
    if (local) {
        localStorage.setItem(cname, cvalue);
        return;
    }
    document.cookie = cname + "=" + cvalue + ";";
}
var local = location.href.includes('file')

function getCookie(cname) {
    if (local) {
        return localStorage.getItem(cname);
    }
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}