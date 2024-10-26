function calculateDuration() {
    var elements = document.querySelectorAll('.duration');
    var durations = 0;

    elements.forEach(function (element) {
        var durationValue = parseInt(element.getAttribute('data-duration'));
        durations += durationValue;
    });

    secondsToMinutes(durations);

    return durations;
}

function calculateCalo() {
    var elements = document.querySelectorAll('.calo');
    var totalCalo = 0;

    elements.forEach(function (element) {
        var caloValue = parseInt(element.getAttribute('data-calo'));
        totalCalo += caloValue;
    });
    document.getElementById('calo_viewcoach').innerText = totalCalo;
}

function calculatteLesson() {
    var elements = document.querySelectorAll('.title');
    var totalLesson = 0;

    elements.forEach(function (element) {
        totalLesson++;
    });
    document.getElementById('lesson_viewcoach').innerText = totalLesson;
}

function secondsToMinutes(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
        return 'Invalid input';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${minutes}m ${remainingSeconds}s`;
    
    document.getElementById('time_viewcoach').innerText = formattedTime;

    return formattedTime;
}
document.addEventListener('DOMContentLoaded', function () {
    calculatteLesson();
    calculateCalo();
    calculateDuration();
});
