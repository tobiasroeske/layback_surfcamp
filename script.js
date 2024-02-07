let sliderIndex = 0;

async function init() {
    await includeHTML();
    startSlideShow(indexSlider);
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

function nextPhoto(slider) {
    sliderIndex++
    let sliderImage = document.getElementById('sliderImage');
    sliderImage.src = slider[sliderIndex]['path'];
    sliderImage.setAttribute('alt', `${slider[sliderIndex]['alt-text']}`);
    if (sliderIndex == slider.length - 1) {
        sliderIndex = 0;
    }
}

function previousPhoto(slider) {
    if (sliderIndex == 0) {
        sliderIndex = slider.length - 1;

    } else {
        sliderIndex--
    }
    let sliderImage = document.getElementById('sliderImage');
    sliderImage.src = slider[sliderIndex]['path'];
    sliderImage.setAttribute('alt', `${slider[sliderIndex]['alt-text']}`);
    
}

function startSlideShow(slider) {
    nextPhoto(slider);
    setTimeout(startSlideShow, 3000);
}

