'use strict'

document.addEventListener('DOMContentLoaded', function (event) {
    spinningSound.play();
});

function turnOffLights() {
    const lightsOff = document.getElementById('lights');
    lightsOff.style.class = 'off'
}

function showButton(event) {
    event.preventDefault();
    displayEight.style.transition = 'opacity 2s';
    displayEight.style.opacity = '1';
    setTimeout(() => {
        displayEight.style.display = 'none';
    }, 2000); 
