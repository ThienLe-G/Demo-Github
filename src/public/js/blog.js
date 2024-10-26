function renderBlogs(blog) {
    let content = '';
    blog.forEach(
        (element) =>
        (content += `
        <div class="col pb-3">
        <div class="card">
            <a href="blog/blogDetail/${element.slug}">
                <img src="${element.image
            }" class="card-img-top" style="height: 300px;" alt="...">
            </a>
            <div class="card-body pb-0">
                <h5 class="card-title">${element.title}</h5>
                <div class=" col-lg-8 d-flex justify-content-start">
                    <img class="col-lg-4 col-1 my-2" style="width: 30px; height: 30px" src="/img/Image.png" alt>
                    <p class="m-0 d-flex align-items-center mx-2" style="font-size:medium;">${element.author
            }</p>
                </div>
                <p class="content-text-blog">${element.content}</p>
                <div class="d-flex justify-content-between">
                    <p class="card-text" style="font-size:14px;">${generateDateTime(
                element.updatedAt,
            )}</p>
                    <p class="card-text ">
                        <a href="/blog/blogDetail/${element.slug
            }" class="text-danger fw-medium fw-semibold"
                            style="text-decoration: none">MORE
                            INFO<img class="pb-1" src="/img/goRight.png" alt=""></a>
                    </p>
                </div>

            </div>
        </div>
    </div>
    `),
    );
    document.getElementById('blogPanigation').innerHTML = content;
}

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
                    `blog/showPanigation?page=${nextPage}`,
                );
                renderBlogs(response.data.blogs);
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
                    `blog/showPanigation?page=${prevPage}`,
                );
                renderBlogs(response.data.blogs);
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

function generateDateTime(time) {
    const dateTime = new Date(time);
    const options = { year: 'numeric', month: 'long' };
    const formattedMonthYear = dateTime.toLocaleString('en-US', options);
    return formattedMonthYear;
}
