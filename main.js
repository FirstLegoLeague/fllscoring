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

function showDisclaimer(){
	disclaimer.classList.add('visible');
}

function acceptDisclaimer(){
	disclaimer.classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', function() {
	console.log("show me");
   showDisclaimer()
}, false);
/* hide phone browser address bar */
window.scrollTo(0,1);