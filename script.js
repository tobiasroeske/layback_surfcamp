let sliderIndex = 0;
let slideShowInterval;

async function init(slider) {
    await includeHTML();
    startSlideShow(slider, 'sliderImage');
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function nextPhoto(slider, id) {
    sliderIndex++
    let sliderImage = document.getElementById(id);
    sliderImage.src = slider[sliderIndex]['path'];
    sliderImage.setAttribute('alt', `${slider[sliderIndex]['alt-text']}`);
    if (sliderIndex == slider.length - 1) {
        sliderIndex = 0;
    }
}

function previousPhoto(slider, id) {
    if (sliderIndex == 0) {
        sliderIndex = slider.length - 1;

    } else {
        sliderIndex--
    }
    let sliderImage = document.getElementById(id);
    sliderImage.src = slider[sliderIndex]['path'];
    sliderImage.setAttribute('alt', `${slider[sliderIndex]['alt-text']}`);
    
}

function startSlideShow(slider, id) {
    nextPhoto(slider, id);
    slideShowInterval = setTimeout(() => startSlideShow(slider, id), 3000);
    
}

function stopSlideShow() {
    clearInterval(slideShowInterval);
    openSlideshow();
}

function openSlideshow() {
    document.getElementById('popup').classList.remove('d-none');
}

function closePopup() {
    document.getElementById('popup').classList.add('d-none');
}

