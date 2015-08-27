var frame = document.getElementById('demoframe');
var qr = document.getElementById('qr');
function rescale(className) {
    frame.className = className;
}

function openQr() {
    qr.classList.add('visible');
}

function closeQr() {
    qr.classList.remove('visible');
}

/* hide phone browser address bar */
window.scrollTo(0,1);