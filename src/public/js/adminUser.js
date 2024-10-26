function viewModal(
    email,
    age,
    name,
    height,
    weight,
    pal,
    sex,
    requiredCaloriesAmount,
    photoUrl,
    bmi
) {
    document.getElementById("viewName").value = name;
    document.getElementById("viewEmail").value = email;
    document.getElementById("viewHeight").value = height;
    document.getElementById("viewWeight").value = weight;
    document.getElementById("viewAge").value = age;
    document.getElementById("viewBMI").value = bmi;
    document.getElementById("viewRequirement").value = requiredCaloriesAmount;
    document.getElementById("viewPhotoUrl").src = photoUrl;

    if (pal == ActivityStatus.SEDENTARY) {
        document.getElementById("View_Sedentary").checked = true;
    } else if (pal == ActivityStatus.LIGHTLY_ACTIVE) {
        document.getElementById("View_Lightly_Active").checked = true;
    } else if (pal == ActivityStatus.VERY_ACTIVE) {
        document.getElementById("View_Moderately_Active").checked = true;
    } else {
        document.getElementById("View_Extremely_Active").checked = true;
    }

    if (sex == "Male") {
        document.getElementById("viewMale").checked = true;
    } else if (sex == "Female") {
        document.getElementById("viewFemale").checked = true;
    } else {
        document.getElementById("viewSex3").checked = true;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var createForm = document.getElementById('CreateForm');
    createForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var errors = validateForm();
        if (errors.length === 0) {
            createForm.submit();
        } else {
            var nameError = document.getElementById('NameError');
            nameError.textContent = errors;
        }
    });

    function validateForm() {
        var errors = '';
        var nameInput = document.getElementById('name').value.trim();
        if (nameInput === '' || !isSafeString(nameInput)) {
            errors = 'Vui lòng nhập tên hợp lệ.';
        }
        return errors;
    }

    function isSafeString(str) {
        var safeRegex = /^[a-zA-Z0-9\s]+$/;
        return safeRegex.test(str);
    }

});

function updateUserStatus(id, selectedStatus) {
    axios.post('/admin/update-user-status/' + id + '/' + selectedStatus )
        .then(function (response) { 
            console.log(response.data);
        })
        .catch(error => {
            console.error('Lỗi khi cập nhật trạng thái:', error);
        });
}

function displayImage() {
    var input = document.getElementById('photo');
    var preview = document.getElementById('avtInForm');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

