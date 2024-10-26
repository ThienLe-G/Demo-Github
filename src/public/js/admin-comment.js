document.addEventListener('DOMContentLoaded', function () {
    var deleteForm = document.getElementById('deleteForm');
    deleteForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        var id = deleteForm.getAttribute('data-id');
        $('#confirmDelete').modal('hide');
        var comments = await axios.delete(`delete-comment/${id}`);
        renderComments(comments.data);
    });
});

function renderComments(comments) {
    let content = '';
    comments.forEach((comment) => {
        content += `
            <tr id='${comment._id}'>
                <th><p>${comment._id}</p></th>
                <th><p>${comment.blogId}</p></th>
                <th><p>${comment.content}</p></th>
                <th style="width: 20%;"><img src="${comment.imgUrl}" alt="" style="width: 70%"></th>
                <th>${comment.userId}</th>
                <th>${comment.parentId}</th>
                <th>${comment.responseTimes}</th>
                <th width="150px">
                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDelete"
                        data-bs-whatever="@getbootstrap" id="deleteButton" onclick="document.getElementById('deleteForm').setAttribute('data-id', '${comment._id}')">
                        <span class="icon-wrapper">
                            <svg class="icon" width="24px" height="24px" color="white" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                                    stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </svg>
                        </span>
                    </button>
                    <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#updateModal"
                        data-bs-whatever="@getbootstrap" onclick="updateForm('${comment._id}', '${comment.content}', '${comment.imgUrl}')">
                        <span class="icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24px" height="24px"
                                color="white" viewBox="0 0 35 35" fill="none">
                                <path
                                    d="M32.4431 4.12285C32.6416 4.32201 32.7531 4.59176 32.7531 4.87297C32.7531 5.15419 32.6416 5.42394 32.4431 5.6231L30.2267 7.8416L25.9767 3.5916L28.1931 1.3731C28.3923 1.17391 28.6625 1.06201 28.9443 1.06201C29.226 1.06201 29.4962 1.17391 29.6955 1.3731L32.4431 4.12072V4.12285ZM28.7243 9.34185L24.4743 5.09185L9.99672 19.5716C9.87977 19.6885 9.79172 19.8311 9.7396 19.9881L8.02897 25.1178C7.99795 25.2114 7.99355 25.3117 8.01625 25.4075C8.03896 25.5034 8.08788 25.5911 8.15755 25.6608C8.22722 25.7304 8.3149 25.7794 8.41078 25.8021C8.50665 25.8248 8.60696 25.8204 8.70047 25.7893L13.8302 24.0787C13.987 24.0272 14.1296 23.9399 14.2467 23.8237L28.7243 9.34185Z"
                                    fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M2 28.5625C2 29.4079 2.33583 30.2186 2.9336 30.8164C3.53137 31.4142 4.34212 31.75 5.1875 31.75H28.5625C29.4079 31.75 30.2186 31.4142 30.8164 30.8164C31.4142 30.2186 31.75 29.4079 31.75 28.5625V15.8125C31.75 15.5307 31.6381 15.2605 31.4388 15.0612C31.2395 14.8619 30.9693 14.75 30.6875 14.75C30.4057 14.75 30.1355 14.8619 29.9362 15.0612C29.7369 15.2605 29.625 15.5307 29.625 15.8125V28.5625C29.625 28.8443 29.5131 29.1145 29.3138 29.3138C29.1145 29.5131 28.8443 29.625 28.5625 29.625H5.1875C4.90571 29.625 4.63546 29.5131 4.4362 29.3138C4.23694 29.1145 4.125 28.8443 4.125 28.5625V5.1875C4.125 4.90571 4.23694 4.63546 4.4362 4.4362C4.63546 4.23694 4.90571 4.125 5.1875 4.125H19C19.2818 4.125 19.552 4.01306 19.7513 3.8138C19.9506 3.61454 20.0625 3.34429 20.0625 3.0625C20.0625 2.78071 19.9506 2.51046 19.7513 2.3112C19.552 2.11194 19.2818 2 19 2H5.1875C4.34212 2 3.53137 2.33583 2.9336 2.9336C2.33583 3.53137 2 4.34212 2 5.1875V28.5625Z"
                                    fill="white" />
                            </svg>
                        </span>
                    </button>
                </th>
            </tr>
        `;
    });
    $('#commentList')[0].innerHTML = content;
}

async function handleUpdateForm() {
    event.preventDefault();
    var formData = new FormData(event.target.form);
    var data = await axios.post(
        'http://localhost:3000/admin/update-comment',
        formData,
    );
    $('#updateModal').modal('hide');
    renderComments(data.data);
}

function updateForm(id, content, imgUrl) {
    $('#id')[0].value = id;
    $('#updateContent')[0].value = content;
    if (imgUrl) {
        $('#previewImage')[0].src = imgUrl;
        $('#previewImage')[0].style.display = 'block';
    }
}

function displayImage() {
    var input = document.getElementById('updateImg');
    var preview = document.getElementById('previewImage');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };

        reader.readAsDataURL(input.files[0]);
    }
}
