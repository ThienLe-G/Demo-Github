function renderInf() {
    $('#username')[0].textContent = user.name || '';
    $('#bmi')[0].textContent =
        user.BMIchange[user.BMIchange.length - 1]?.value || 0 || '';
    $('#height')[0].textContent = user.height;
    $('#weight')[0].textContent = user.weight;
    $('#age')[0].textContent = user.age;

    $('#calo')[0].textContent = parseInt(user.requiredCaloriesAmount);
    $('#nameInput')[0].value = user.name;
    $('#heightInput')[0].value = user.height;
    $('#weightInput')[0].value = user.weight;
    $('#ageInput')[0].value = user.age;

    $('#avatar')[0].src = user.photoUrl;
    $('#avtInForm')[0].src = user.photoUrl;

    $('#requiredCalories')[0].innerHTML = parseInt(user.requiredCaloriesAmount);
}
function update() {
    event.preventDefault();
    if (validateForm()) {
        $('#formUpdateModal').modal('hide');
        var form = $('#updateForm')[0];
        var formData = new FormData(form);
        axios
            .post('http://localhost:3000/user', formData)
            .then(function (response) {
                user = response.data;
                BMIchart(user);
                renderInf();
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    }
}

function displayImage() {
    var input = document.getElementById('avtInput');
    var preview = document.getElementById('avtInForm');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

//CHART

function BMIchart(user) {
    if (chart) {
        chart.destroy();
    }
    const bmiDates = user.BMIchange.map((entry) => entry.date);
    const bmiValues = user.BMIchange.map((entry) => entry.value);

    const data = {
        labels: bmiDates,
        datasets: [
            {
                label: 'BMI',
                backgroundColor: 'pink',
                borderColor: 'pink',
                data: bmiValues,
                tension: 0.4,
            },
        ],
    };

    const config = {
        type: 'line',
        data: data,
    };

    chart = new Chart(canvas, config);
}

function renderFoodMenu(foods) {
    var modalMenuContent = '';
    var menuContent = '';
    var totalCalories = 0;
    foods.forEach((food) => {
        menuContent += `
            <tr class="row bg-light p-2">
                <td class="col-lg-2  fs-5 p-0 d-flex align-items-center justify-content-center">${food.name
            }
                </td>
                <td class="col-lg-2  fs-5 p-0 d-flex align-items-center justify-content-center">
                    <img src="${food.img
            }" alt="" style="width: 80px; height: 70px;">
                </td>
                <td class="col-lg-2  fs-5 p-0 d-flex align-items-center justify-content-center">${food.calo
            }
                </td>
                <td class="col-lg-2  fs-5 p-0 d-flex align-items-center justify-content-center">${food.grams || 0
            }</td>
                <td class="col-lg-2  fs-5 p-0 d-flex align-items-center justify-content-center">${food.totalCalories
            }
                </td>
                <td class="col-lg-2  fs-5 p-0 d-flex align-items-center justify-content-center">
                    ${food.category}
                </td>
            </tr>
        `;

        modalMenuContent += `
            <tr class="text-center fw-bold justify-content-center">
                <td class="menuRow">${food.name}</td>
                <td class="menuRow">${food.calo}</td>
                <td class="menuRow">${food.grams}</td>
                <td class="menuRow">${food.totalCalories}</td>
                <td class="menuRow"><i class="bi bi-trash3-fill p-1 px-2 rounded-2" onclick="removeFromMenu('${food._id}')"
                    style="background-color: rgba(253, 0, 84, 1); color: white; cursor: pointer;"></i>
                </td>
            </tr>
        `;

        totalCalories += food.totalCalories;
    });
    $('#foodMenu')[0].innerHTML = menuContent;
    $('#modalMenu')[0].innerHTML = modalMenuContent;
    $('#totalItems')[0].innerHTML = foods.length;
    $('#totalCalories')[0].innerHTML = totalCalories + ' calo';
}

function removeFromMenu(idFood) {
    console.log('removeFood');
    axios.post(`food/remove?id=${idFood}`).then((res) => {
        renderFoodMenu(res.data.userMenu);
    });
}

function validateItem(notificationError, inputId) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(notificationError);

    if (!input.value.trim() || isNaN(parseFloat(input.value.trim())) || parseFloat(input.value.trim()) <= 0) {
        error.textContent = 'Please enter a valid positive number';
        input.classList.add('is-invalid');
        return false;
    } else {
        error.textContent = '';
        input.classList.remove('is-invalid');
        return true;
    }
}

function validateForm() {
    var isTitleValid = validateItem('heightError', 'heightInput');
    var isCaloValid = validateItem('weightError', 'weightInput');
    var isVideoValid = validateItem('ageError', 'ageInput');
    return isTitleValid && isCaloValid && isVideoValid;
}