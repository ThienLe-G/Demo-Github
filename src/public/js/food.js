let email = document.getElementById('foodList').getAttribute('data-email');
let isLogin = document.getElementById('foodList').getAttribute('data-isLogin');

function filterBy(param) {
    if(isLogin === "true"){
        ctgrFood = document.getElementById('categoryFood');
        ctgrFood.setAttribute('data-keyword', param);
        console.log(ctgrFood.getAttribute('data-keyword'));
        document.getElementById('categorySelection').textContent = param;
        let isDisable = true;
        if (isDisable) {
            ctgrFood.style.backgroundColor = 'rgba(253, 0, 84, 1)';
            ctgrFood.style.color = 'white';
            renderResultFilter();
            isDisable = false;
        }
    }
    else{
        alert("Please login to access this feature !")
    }
}

let favrFood = document.getElementById('favouriteFood');
let isDisableFvr = Boolean(favrFood.getAttribute('isDisable'));
favrFood.addEventListener('click', () => {
    if(isLogin === 'true'){
        isDisableFvr = !isDisableFvr;
        if (isDisableFvr) {
            favrFood.style.backgroundColor = 'rgba(253, 0, 84, 1)';
            favrFood.style.color = 'white';
            let keyword = 'favourite';
            favrFood.setAttribute('data-isDisable', false);
            console.log(favrFood.getAttribute('data-isDisable'));
    
            renderResultFilter();
        } else {
            favrFood.style.backgroundColor = 'white';
            favrFood.style.color = 'rgba(253, 0, 84, 1)';
            favrFood.setAttribute('data-isDisable', true);
            console.log(favrFood.getAttribute('data-isDisable'));
        }
    }
    else{
        alert('Please login to access this feature!')
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let engFood = document.getElementById('caloriesFood');
    let isDisableEng = Boolean(engFood.getAttribute('isDisable'));
    engFood.addEventListener('click', () => {
        if(isLogin === "true"){
            isDisableEng = !isDisableEng;
            if (isDisableEng) {
                let sortKey = 'up';
                engFood.setAttribute('data-isDisable', false);
                renderResultFilter();
                engFood.style.backgroundColor = 'rgba(253, 0, 84, 1)';
                engFood.style.color = 'white';
            } else {
                engFood.style.backgroundColor = 'white';
                engFood.style.color = 'rgba(253, 0, 84, 1)';
                engFood.setAttribute('data-isDisable', true);
            }
        }
        else{
            alert('Please login to access this feature!')
        }
    });
});

function renderFoodList(food) {
    let content = '';
    food.forEach(
        (element) =>
            (content += `
            <div class="rowTbl d-flex justify-content-start p-0 mb-1 text-center">
              <div class="iconHeart d-flex align-items-center justify-content-center p-0" id="iconHeart" style="width: 45px; background-color: rgb(178, 178, 178); border-radius: 10px 0px 0px 10px;">
                <button class="border-0 p-0 m-0" style="background-color:rgb(178, 178, 178)!important ; ," onclick="toggleHeart(this,'${element._id}')">
                  <i class="bi bi-suit-heart-fill fs-4 p-0 mx-2 heart" data-idFood=${element._id} data-isdisable="${element.isDisable}" ></i>
                </button>
              </div>
              <div class="cellTbl d-flex align-items-center justify-content-center p-2">${element.name}</div>
              <div class="cellTbl d-flex align-items-center justify-content-center">
                <img src="${element.img}" class="" alt="image food"7
                    style="width: 90px; height: 90px; overflow: hidden;">
              </div>
              <div class="cellTbl d-flex align-items-center justify-content-center">${element.calo}</div>
              <div class="cellTbl d-flex align-items-center justify-content-center">${element.category}</div>
              <div class="cellTbl d-flex align-items-center justify-content-start ps-3 ipWeight">
                <input class="rounded-3 p-1 ps-2 me-1" placeholder="Enter number" type="text" id="grams${element._id}" style="width: 110px; border: none; outline: none; background-color:  #e7e7e7; "> <span>gam</span> 
              </div>
            <div class="cellTbl lastCell d-flex align-items-center justify-content-center">
              <form action="" method="post" id="formAdd2Menu${element._id}">
                <input type="hidden" name="idFood" class="idFood" value="${element._id}">
                <input type="hidden" name="emailUser" value="${email}">
                <button class="border-0" style="background-color: white;" onclick="checkLoginFood(${isLogin}); renderResultAdd(event, 'formAdd2Menu${element._id}', '#grams${element._id}');">
                    <i class="bi bi-plus-square-fill fs-4" style="color: rgba(253, 0, 84, 1);"></i>
                </button>
              </form>
            </div>
           </div>
    `),
    );
    document.querySelector('#foodList').innerHTML = content;
}

function renderUserMenu(userMenu) {
    let contentMenu = '';
    let count = 0;
    let totalCalories = 0;
    userMenu.forEach((item) => {
        item.totalGrams = parseInt(item.totalGrams);
        contentMenu += `
    <tr class="text-center fw-bold justify-content-center">
      <td class="menuRow">${item.name}</td>
      <td class="menuRow">${item.calo}</td>
      <td class="menuRow">${item.grams}</td>
      <td class="menuRow">${item.totalGrams}</td>
      <td class="menuRow" style="width: 100px; height: 40px;" onclick="removeFromMenu('${item.id}')"><i class="bi bi-trash3-fill p-1 px-2 rounded-2" style="background-color: rgba(253, 0, 84, 1); color: white; cursor: pointer;"></i></td>
    </tr>
    `;
        count += 1;
        totalCalories += parseInt(item.totalGrams);
    });
    document.getElementById('tblMenuUser').innerHTML = contentMenu;
    document.getElementById('menuItem').textContent = count;
    document.getElementById('menuCalories').textContent =
        parseInt(totalCalories) + ' calo';
}

function toggleHeart(button, idFood) {
    let iconHeart = button.querySelector('.heart');
    let isDisableIcon = iconHeart.getAttribute('data-isDisable');
    if( isLogin  === "true"){
        if (isDisableIcon == 'true') {
            addToFavourite(idFood);
            iconHeart.style.color = 'rgba(253, 0, 84, 1)';
            iconHeart.setAttribute('data-isDisable', 'false');
            isDisableIcon = false;
        } else {
            iconHeart.style.color = 'white';
            iconHeart.setAttribute('data-isDisable', 'true');
            removeFromFavourite(idFood);
            isDisableIcon = true;
        }
    }
    else{
        alert('Please login to access this feature')
    }
}

async function sortToggle() {
    if(isLogin === "true"){
        const caloriesFoodElement = document.getElementById('caloriesFood');
        const currentIsDisable =
            caloriesFoodElement.getAttribute('data-isDisable') === 'true';
        const newIsDisable = !currentIsDisable;
        caloriesFoodElement.setAttribute('data-isDisable', newIsDisable);
    
        renderResultFilter();
    }
    else{
        alert('Please login to access this feature !')
    }
}

async function renderResultSearch() {
    keyword = document.querySelector('#search').value;
    await axios.get(`food/search?keyword=${keyword}`).then((res) => {
        renderFoodList(res.data.foods);
    });
}

async function renderResultSort(keyword) {
    await axios.get(`food/sort?keyword=${keyword}`).then((res) => {
        renderFoodList(res.data.foods);
    });
}

async function renderResultAdd(event, formID, elementID) {
    event.preventDefault();
    if(isLogin === 'true'){
        form = document.getElementById(formID);
        id = form.querySelector('.idFood').value;
        grams = document.querySelector(elementID).value;
        if(grams === '' || isNaN(grams)) { 
            document.querySelector(elementID).value = '';
            document.querySelector(elementID).focus();
            document.querySelector(elementID).classList.add('error');
            document.querySelector(elementID).classList.add('border-danger');
        }
        else{
            var formData = new FormData(form);
            var data = [...formData];
            const dataObject = {};
            data.forEach(([key, value]) => {
                dataObject[key] = value;
            });
            dataObject['grams'] = grams;
            await axios.post(`food/add`, dataObject).then((res) => {
                renderFoodList(res.data.foods);
                renderUserMenu(res.data.userMenu);
        
            });
        }
    }
    else{
        alert('Please login to access this feature!')
    }
    
}

async function removeFromMenu(idFood) {
    await axios.post(`food/remove?id=${idFood}`).then((res) => {
        renderUserMenu(res.data.userMenu);
    });
}

async function renderResultFavourite() {
    await axios.get(`food/filterFvr`).then((res) => {
        renderFoodList(res.data.foods);
    });
}

async function renderResultCategory(keyword) {
    await axios.get(`food/filterCtgr?category=${keyword}`).then((res) => {
        renderFoodList(res.data.foods);
    });
}

//  |---------------------------------------------------------------------------------------------EDIT SECTION--------------------------------------------------------------------------------------|
//  |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

async function renderResultFilter() {
    let fvrStatus = document
        .getElementById('favouriteFood')
        .getAttribute('data-isDisable');
    let engStatus = document
        .getElementById('caloriesFood')
        .getAttribute('data-isDisable');
    let ctgrKeyword = document
        .getElementById('categoryFood')
        .getAttribute('data-keyword');
    await axios
        .get(
            `food/ultimateFilter?fvr=${fvrStatus}&eng=${engStatus}&keyword=${ctgrKeyword}`,
        )
        .then((res) => {
            renderFoodList(res.data.foods);
        });
}

// |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
// |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

async function addToFavourite(idFood) {
    await axios.post(`food/like?id=${idFood}`).then((res) => {});
}

async function removeFromFavourite(idFood) {
    await axios.post(`food/unlike?id=${idFood}`).then((res) => {
    });
}

function clearSearch() {
    document.getElementById('search').value = null;
}

//Panigation
document
    .getElementById('currentPage_btn_right')
    .addEventListener('click', async function () {
        const currentValue = parseInt(getBeforeSlashValue());
        let nextPage;

        if (currentValue >= parseInt(getAfterSlashValue())) {
            addToValueBeforeSlash(parseInt(getAfterSlashValue()));
        } else {
            try {
                nextPage = currentValue + 1;
                const response = await axios.get(
                    `food/showPanigation?page=${nextPage}`,
                );
                renderFoodList(response.data.foods);
                addToValueBeforeSlash(nextPage);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    });

document
    .getElementById('currentPage_btn_left')
    .addEventListener('click', async function () {
        const currentValue = parseInt(getBeforeSlashValue());
        let prevPage;

        if (currentValue <= 1) {
            addToValueBeforeSlash(1);
        } else {
            try {
                prevPage = currentValue - 1;
                const response = await axios.get(
                    `food/showPanigation?page=${prevPage}`,
                );
                renderFoodList(response.data.foods);
                addToValueBeforeSlash(prevPage);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    });

function addToValueBeforeSlash(newValue) {
    const mySpan = document.getElementById('panigation');
    const parts = mySpan.innerText.split('/');
    parts[0] = newValue;
    mySpan.innerText = parts.join('/');
}

function getBeforeSlashValue() {
    const mySpan = document.getElementById('panigation');
    return parseInt(mySpan.innerText.split('/')[0]);
}

function getAfterSlashValue() {
    const mySpan = document.getElementById('panigation');
    return parseInt(mySpan.innerText.split('/')[1]);
}
