let time_enable = 5000;
let index = 0;
let secondRest = 5;
let timer2;
let isRestTimerRunning = true;
var buttonClicked = false;
let videoIframes = document.querySelectorAll('.video');
let quanityVideo = videoIframes.length;
console.log(quanityVideo)

document.addEventListener('DOMContentLoaded', () => {
    let video = document.getElementById('video');
    let timer = (document.getElementById(
        'timer',
    ).textContent = `00 : ${video.getAttribute('data-duration')}`);
    document.getElementById('rep').textContent = video.getAttribute('data-rep');

    let total_time = document.getElementById('time_start');
    let rest_time = document.getElementById('rest');
    let minutes = 0;
    let seconds = 0;
    function updateCountup() {
        seconds++;
        const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        total_time.textContent = `${minutesDisplay} : ${secondsDisplay}`;
        if (seconds == 59) {
            seconds = -1;
            minutes++;
        }
    }
    function updateCountdown() {
        if (isRestTimerRunning) {
            secondRest--;
            const secondsDisplay =
                secondRest < 10 ? `0${secondRest}` : secondRest;
            rest_time.textContent = `00 : ${secondsDisplay}`;
            if (secondRest === 0 ) {
                clearInterval(timer2);
                isRestTimerRunning = false;
                let button = document.getElementById('start');
                button.removeAttribute('disabled');
                button.classList.add('shake');
            }
        }
    }
    let timer1 = setInterval(updateCountup, 1000);
    let timer2 = setInterval(updateCountdown, 1000);
    
    setTimeout(enableNextButton, time_enable);
    
    document.getElementById('start').addEventListener('click', () => {
        runTimer();
    });
    
    document.getElementById('next').addEventListener('click', () => {
        if (index == quanityVideo) {
            window.location.href = 'http://localhost:3000/video';
        }
        else{
            clearInterval(timer2);
            nextVideo();
            timer2 = setInterval(updateCountdown, 1000);
        }
    });
    
    document.getElementById('skip').addEventListener('click', () => {
        if (index == 0) {
            console.log("true")
        }
        else{
            console.log(index)
            clearInterval(timer2);
            skipVideo();
            timer2 = setInterval(updateCountdown, 1000);
        }
    });


    function pauseAllVideos() {
        videoIframes.forEach(iframe => {
            if (iframe.contentWindow && iframe.contentWindow.postMessage) {
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        });
    }
});

function nextVideo() {
    buttonClicked = true;
    secondRest = 5;
    document.getElementById('rest').textContent = `00 : 0${secondRest}`;
    document.getElementById('start').classList.remove('shake');
    isRestTimerRunning = true;
    $('#carouselExampleControls').carousel('next');
    index++;
    console.log(index);
    if (index == quanityVideo) {
        // document.getElementById('next').setAttribute('disabled', 'true');
        document.getElementById('skip').setAttribute('disabled', 'true');
        document.getElementById('start').textContent = 'FINISH!!!';
    } else {
        let newVideo = document.querySelector(`.video[data-index="${index}"]`);
        if (!newVideo) {
            index = 0;
            newVideo = document.querySelector('.carousel-item[data-index="0"]');
        }
        let calories =parseInt(document.getElementById('calories').innerHTML) + parseInt(newVideo.getAttribute('data-calo'));
        document.getElementById('calories').innerHTML = calories;
        document.getElementById('timer').textContent = `00 : ${newVideo.getAttribute('data-duration')}`;
        document.getElementById('rep').textContent = parseInt(newVideo.getAttribute('data-rep'));
        document.getElementById('start').setAttribute('disabled', 'true');
        document.getElementById('next').setAttribute('disabled', 'true');
        time_enable = 5000;
        setTimeout(enableNextButton, time_enable);
        setTimeout(enableStartButton, time_enable);
        setTimeout(() => {
            document.getElementById('start').classList.add('shake');
        }, time_enable);
    }
}

function skipVideo() {
    buttonClicked = true;
    secondRest = 5;
    document.getElementById('rest').textContent = `00 : 0${secondRest}`;
    document.getElementById('start').classList.remove('shake');
    isRestTimerRunning = true;
    $('#carouselExampleControls').carousel('prev');
    index--;
    let newVideo = document.querySelector(`.video[data-index="${index}"]`);
    if (!newVideo) {
        index = 0;
        newVideo = document.querySelector('.carousel-item[data-index="0"]');
    }
    if (newVideo) {
        document.getElementById('timer').textContent = `00 : ${newVideo.getAttribute('data-duration')}`;
        document.getElementById('rep').textContent = parseInt(newVideo.getAttribute('data-rep'));
        document.getElementById('start').setAttribute('disabled', 'true');
        document.getElementById('next').setAttribute('disabled', 'true');
        time_enable = 5000;
        setTimeout(enableNextButton, time_enable);
        setTimeout(() => {
            document.getElementById('start').classList.add('shake');
        }, time_enable);
    }
    
}


function enableNextButton() {
    document.getElementById('next').removeAttribute('disabled');
}
function enableStartButton() {
    document.getElementById('start').removeAttribute('disabled');
}

function runTimer() {
    document.getElementById('start').setAttribute('disabled', 'true');
    let countTimerElement = document.getElementById('timer');
    let seconds = parseInt(countTimerElement.textContent.slice(5, 7));
    function updateCountdown() {
        seconds--;
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        countTimerElement.textContent = `00 : ${secondsDisplay}`;
        if (seconds <= 0) {
            clearInterval(timer3);
            document.getElementById('start').setAttribute('disabled', 'true');
            document.getElementById('next').classList.add('shake');
        }
    }
    let timer3 = setInterval(updateCountdown, 1000);
    document.getElementById('next').addEventListener('click', () => {
        clearInterval(timer3);
    });
    document.getElementById('skip').addEventListener('click', () => {
        clearInterval(timer3);
    });
}

function runProgressBar() {
    var elem = document.getElementById('myBar');
    let videoDuration = document.querySelector(`.video[data-index="${index}"]`);
    console.log(videoDuration.getAttribute('data-index'));
    let second = videoDuration.getAttribute('data-duration');
    var totalDuration = second * 1000;
    var steps = 50;
    var width = 0;
    var intervalDuration = totalDuration / steps;
    function frame() {
        if (buttonClicked && width <= 1000) {
            width = 0;
            clearInterval(interval);
            buttonClicked = false;
        } else {
            width += 100 / steps;
            elem.style.width = width + '%';
        }
    }

    var interval = setInterval(frame, intervalDuration);
}
