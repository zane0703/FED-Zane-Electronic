"use strict";
const buttons = document.querySelectorAll(".nav-tabs button"),
    services = document.getElementsByClassName("service");
var i = 0, canmove = true,len = services.length-1
window.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 37: if (i !== 0) { move(i-1); }
            break;
        case 39: if (i !== len) { move(i+1); }
            break
    }
})
document.querySelector(".nav-tabs").addEventListener("wheel", function (e) {
    e.preventDefault()
    if ((e.deltaY < 0 || e.deltaX < 0) && canmove && i !== 0) { move(i-1); }
    if ((e.deltaY > 0 || e.deltaX > 0) && canmove && i !== len) { move(i+1); }
})

buttons.forEach(function (v,k){
    v.onclick = function (){move(k)}
})
function move(j) {
    buttons[i].classList.remove("active");
    services[i].classList.add("d-none");
    i= j
    services[i].classList.remove("d-none");
    buttons[i].classList.add("active");
}