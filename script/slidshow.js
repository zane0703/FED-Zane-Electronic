"use strict";
/*
  Author: Ang Yun Zane
  Date:   5 August 2019 
 
  Filename: slidshow.js
 */
/* declare variable and const
I added "Array.prototype.slice.call" because IE don't support NodeList.forEach
*/
var i = 0, canmove = true, pauseauto = false, size;
const imgnav = document.querySelectorAll("#imgnav button"), imagediv = document.querySelectorAll(".slidshow figure"), slidshow = document.querySelector(".slidshow"), IMG = Array.prototype.slice.call(document.querySelectorAll(".slidshow img"), 0), NAVBU = Array.prototype.slice.call(document.querySelectorAll("#imgnav button"), 0);
document.getElementById("nx").onclick = next;
document.getElementById("bk").onclick = back;
/* change img size */
function changesize() {
  setTimeout(function () {
    document.querySelector(".slidshow").style.height = (IMG[0].offsetHeight + 50) + "px"
  }, 100);
  let size = (document.querySelector(".slidshow").offsetWidth) + "px"
  IMG.forEach(function (v) {
    v.style.width = size;
  })
}
changesize()
window.addEventListener("resize", changesize)

/* KeyboardEvent */
window.addEventListener("keydown", function (e) {
  switch (e.keyCode) {
    case 37: back();
      break;
    case 39: next();
      break;
    case 70: ONfull()
      break;
  }
})
/* moouse weel */
document.querySelector(".slidshow").addEventListener("wheel", function (e) {
  e.preventDefault()
  if (e.deltaY < 0 || e.deltaX < 0) { back() }
  if (e.deltaY > 0 || e.deltaX > 0) { next() }
})
/* View in fullscreen */
if (slidshow.requestFullscreen) {
  var browser = 0
} else if (slidshow.mozRequestFullScreen) { /* Firefox */
  var browser = 1
} else if (slidshow.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
  var browser = 2
} else if (slidshow.msRequestFullscreen) { /* IE/Edge */
  var browser = 3
}
document.getElementById("fullscreen").onclick = ONfull
function ONfull() {
  if (document.fullscreenElement) {
    switch (browser) {
      case 0: document.exitFullscreen();
        break;
      case 1: document.mozCancelFullScreen();
        break;
      case 2: document.webkitExitFullscreen();
        break;
      case 3: document.msExitFullscreen();
    }
  } else {
    switch (browser) {
      case 0: slidshow.requestFullscreen();
        break;
      case 1: slidshow.mozRequestFullScreen();
        break;
      case 2: slidshow.webkitRequestFullscreen();
        break;
      case 3: slidshow.msRequestFullscreen();
    }
  }
}
/* image jump point */
NAVBU.forEach(function (v, k) {
  v.onclick = change.bind(null,k)
})
function change(index) {
  if (canmove) {
    canmove = false
    imgnav[i].classList.remove("active")
    
    imagediv[index].style.visibility="visible"
    if(i<index){
      for(let j = index-1; j>=i;j--){
        imagediv[j].style.transform="translate(-100%,0)"
      }
    }else{
      for(let j = index+1;j<=i;j++){
        imagediv[j].style.transform="translate(100%,0)"
      }
    }
    
    imgnav[index].classList.add("active")
    imagediv[index].style.transform="translate(0,0)"

    setTimeout(function () {
      imagediv[i].style.visibility="hidden"
      i = index; 
      canmove = true; 
    }, 1000)
  }
}
function back() { if (i === 0) { change(4) } else { change(i - 1) }; }
function next() { if (i === 4) { change(0) } else { change(i + 1) }; }
/* set auto play */
var autoplay = setInterval(next, 5000);

document.getElementById("pause").onclick = function () {
  if (pauseauto) {
    autoplay = setInterval(next, 5000);
    document.getElementById("pause").style.color = "";
    pauseauto = false;
  } else {
    clearInterval(autoplay);
    document.getElementById("pause").style.color = "#fff";
    pauseauto = true;

  }
}
/* pause auto play when the page is not visible */
window.addEventListener("visibilitychange", function () {
  if (document.visibilityState === 'visible') {
    if (!pauseauto) { autoplay = setInterval(next, 5000); }
  } else { clearInterval(autoplay); }
})
