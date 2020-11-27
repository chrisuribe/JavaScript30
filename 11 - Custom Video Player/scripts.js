
/* Get our elements */

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const fullScreenButton = player.querySelector('.full__screen');


/* Build out functions */

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {

    const {skip} = this.dataset;
    video.currentTime += parseFloat(skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime; 
}

function switchFullScreen() {
    console.log("full screen switching. CUrrent status: ", fullScreenEnabled);
        fullScreenEnabled ? openFullscreen(player) : closeFullscreen(player);
        //fullScreenEnabled ? fullScreenEnabled = false : fullScreenEnabled = true;
        fullScreenEnabled = -(fullScreenEnabled);
  
}

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  
  /* Close fullscreen */
  function closeFullscreen(elem) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }

/* Hook up the event listners */

video.addEventListener("click", togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => {range.addEventListener('change', handleRangeUpdate)});
ranges.forEach(range => {range.addEventListener('mousemove', handleRangeUpdate)});


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

let fullScreenEnabled = false;
fullScreenButton.addEventListener('mousedown', switchFullScreen);
