function updateForm(id, title, videoId, caloriesAmount, level, category, sex, BMItype, duration) {
    document.getElementById('updateForm').action = '/admin/update-video/' + id;
    document.getElementById('updateTitle').value = title;
    document.getElementById('updateVideoId').value = videoId;
    document.getElementById('updateBMItype').value = BMItype;
    document.getElementById('updateDuration').value = duration;
    document.getElementById('updateCaloriesAmount').value = caloriesAmount;

    if (level == 'beginner') {
        document.getElementById('updateLevel1').checked = true;
    } else if (level == 'medium') {
        document.getElementById('updateLevel2').checked = true;
    } else {
        document.getElementById('updateLevel3').checked = true;
    }

    if (category == 'arms') {
        document.getElementById('updateArms').checked = true;
    } else if (category == 'legs') {
        document.getElementById('updateLegs').checked = true;
    } else if (category == 'shoulder') {
        document.getElementById('updateShoulder').checked = true;
    } else if (category == 'abs') {
        document.getElementById('updateAbs').checked = true;
    } else {
        document.getElementById('updateChest').checked = true;
    }

    if (sex == 'male') {
        document.getElementById('updateMale').checked = true;
    } else if (sex == 'female') {
        document.getElementById('updateFemale').checked = true;
    } else {
        document.getElementById('updateSex3').checked = true;
    }
}
function deleteVideo(id) {
    document.getElementById('deleteForm').action = '/admin/delete-video/' + id;
}

function validateTitle(titleError, title) {
    var titleInput = document.getElementById(title);
    var titleError = document.getElementById(titleError);

    if (!titleInput.value.trim()) {
        titleError.textContent = 'Please enter a title';
        titleInput.classList.add('is-invalid');
        return false;
    } else {
        titleError.textContent = '';
        titleInput.classList.remove('is-invalid');
        return true;
    }
}

function validateCalo(caloError, caloriesAmount) {
    var caloInput = document.getElementById(caloriesAmount);
    var caloError = document.getElementById(caloError);

    if (isNaN(caloInput.value) || caloInput.value <= 0) {
        caloError.textContent = 'Calories amount must be a positive number';
        caloInput.classList.add('is-invalid');
        return false;
    } else {
        caloError.textContent = '';
        caloInput.classList.remove('is-invalid');
        return true;
    }
}

function validateVideo(videoError, videoId) {
    var videoInput = document.getElementById(videoId);
    var videoError = document.getElementById(videoError);

    if (!videoInput.value.trim()) {
        videoError.textContent = 'Video ID is required';
        videoInput.classList.add('is-invalid');
        return false;
    } else {
        videoError.textContent = '';
        videoInput.classList.remove('is-invalid');
        return true;
    }
}

function validateDuration(durationError, duration) {
    var durationInput = document.getElementById(duration);
    var durationError = document.getElementById(durationError);

    if (isNaN(durationInput.value) || durationInput.value <= 0) {
        durationError.textContent = 'Duration must be a positive number';
        durationInput.classList.add('is-invalid');
        return false;
    } else {
        durationError.textContent = '';
        durationInput.classList.remove('is-invalid');
        return true;
    }
}

function validateFormCreate() {
    var isTitleValid = validateTitle('titleErrorCreate', 'title');
    var isCaloValid = validateCalo('caloErrorCreate', 'caloriesAmount');
    var isVideoValid = validateVideo('videoErrorCreate', 'videoId');
    var isDurationValid = validateDuration('durationErrorCreate', 'duration');
    return isTitleValid && isCaloValid && isVideoValid && isDurationValid;
}

function validateFormUpdate() {
    var isTitleValid = validateTitle('titleErrorUpdate', 'updateTitle');
    var isCaloValid = validateCalo('caloErrorUpdate', 'updateCaloriesAmount');
    var isVideoValid = validateVideo('videoErrorUpdate', 'updateVideoId');
    var isDurationValid = validateDuration('durationErrorUpdate', 'updateDuration');
    return isTitleValid && isCaloValid && isVideoValid && isDurationValid;
}