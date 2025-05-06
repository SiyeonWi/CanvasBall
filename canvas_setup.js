/*
 In this file.
 Canvas size scale setup.
 */
const WIDTH_PERCENTAGE = 0.8;
const HEIGHT_PERCENTAGE = 0.8;
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


function resize() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    canvas.width = windowWidth * WIDTH_PERCENTAGE;
    canvas.height = windowHeight * HEIGHT_PERCENTAGE;
    console.log("resize!")
}


resize()

window.onresize = resize;

