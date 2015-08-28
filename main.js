var frame = document.getElementById('demoframe');
var qr = document.getElementById('qr');
var disclaimer = document.getElementById('disclaimer');
function rescale(className) {
    frame.className = className;
}

function openQr() {
    qr.classList.add('visible');
}

function closeQr() {
    qr.classList.remove('visible');
}

function showDisclaimer(){
	disclaimer.classList.add('visible');
}

function acceptDisclaimer(){
	disclaimer.classList.remove('visible');
}

showDisclaimer();

/* hide phone browser address bar */
window.scrollTo(0,1);