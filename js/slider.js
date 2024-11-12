const btnLeft = document.querySelector(".btn-left");
const btnRigth = document.querySelector(".btn-rigth");
const slider = document.querySelector("#slider");
const sliderSections = document.querySelectorAll(".slider-section");

let currentPosition = 0;
const slidesCount = sliderSections.length;

function moveToRight() {
    currentPosition++;
    if (currentPosition >= slidesCount) {
        currentPosition = 0;
    }
    updateSliderPosition();
}

function moveToLeft() {
    currentPosition--;
    if (currentPosition < 0) {
        currentPosition = slidesCount - 1;
    }
    updateSliderPosition();
}

function updateSliderPosition() {
    const offset = -currentPosition * (100 / slidesCount);
    slider.style.transform = `translateX(${offset}%)`;
}

btnRigth.addEventListener("click", moveToRight);
btnLeft.addEventListener("click", moveToLeft);