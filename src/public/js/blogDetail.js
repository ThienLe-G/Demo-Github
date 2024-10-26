async function checkUserLiked(isLogin, likedList, id) {
    if (isLogin) {
        try {
            var response = await axios.get(
                'http://localhost:3000/user/getUserByEmail',
            );
            var user = response.data;
            $('#userAvt')[0].src = user.photoUrl;
            window.user = user;
            var likeBtn = document.getElementById(`like_${id}`);
            if (likedList.includes(user._id)) {
                likeBtn.classList.toggle('redColor');
                likeBtn.classList.toggle('whiteColor');
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra người dùng đã thích:', error);
        }
    }
}

async function handleLikeBtn(isLogin, id, role) {
    if (!isLogin) {
        $('#login_form').modal('show');
    } else {
        var likeBtn = document.getElementById(`like_${id}`);
        likeBtn.classList.toggle('redColor');
        likeBtn.classList.toggle('whiteColor');
        if (likeBtn.classList.contains('redColor')) {
            try {
                data = await axios.patch(
                    `http://localhost:3000/${role}/addLike?${role}Id=${id}&userId=${user._id}`,
                );
                console.log('Like successful!');
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                data = await axios.patch(
                    `http://localhost:3000/${role}/removeLike?${role}Id=${id}&userId=${user._id}`,
                );
                console.log('Unlike successful!');
            } catch (err) {
                console.log(err);
            }
        }
    }
}

document.addEventListener('click', function (event) {
    // Kiểm tra xem phần tử đã click có class là 'replycommentParent' không
    if (event.target.closest('.replyCommentParent')) {
        var replyCommentParent = event.target.closest('.replyCommentParent');
        var commentId = replyCommentParent.querySelector('.replyCommentInp').id;
        var replyComments = document.querySelectorAll('.replyCommentInp');
        replyComments.forEach((e) => {
            if (e.id != commentId) e.innerHTML = '';
        });
    }
});

async function submitComment(isLogin, formId) {
    event.preventDefault();
    if (!isLogin) {
        $('#login_form').modal('show');
    } else {
        var form = $(`#${formId}`)[0];
        var formData = new FormData(form);
        formData.append('userId', user._id);
        await axios.post('http://localhost:3000/comment/', formData);
        $('#commentInp')[0].value = '';
        $('#imageInp')[0].style.display = 'none';
        if (formId == 'commentForm') renderComments(`${blogId}`, isLogin);
        else renderReplyComments(form.parentId.value, isLogin);
    }
}

async function renderReplyComments(parentId, isLogin) {
    try {
        var data = await axios.get(
            `http://localhost:3000/comment/getReplyComments?parentId=${parentId}`,
        );
        var comments = data.data;
        var promises = comments.map(async (comment) => {
            var ownerComment = await axios.get(
                `http://localhost:3000/user/getById?id=${comment.userId}`,
            );
            var ownerName =
                ownerComment.data.name == 'CastError'
                    ? 'Người dùng HappyMinds'
                    : ownerComment.data.name;
            var ownerAvt =
                ownerComment.data.photoUrl == 'CastError'
                    ? 'https://media.istockphoto.com/id/1196083861/vi/vec-to/b%E1%BB%99-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%C4%91%E1%BA%A7u-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-%C4%91%C6%A1n-gi%E1%BA%A3n.jpg?s=612x612&w=0&k=20&c=7juGotIovn0c2KFGhZ_DcEqpfiSyYl-zz2ty9XYnYNs='
                    : ownerComment.data.photoUrl;
            var id = comment._id;
            var likedList = comment.likedList;
            var bgColor = '';
            var color = '';
            if (likedList.includes(ownerComment.data._id) && isLogin) {
                bgColor = 'redColor';
                color = 'whiteColor';
            }
            return `
                <div class="d-flex justify-content-start card mt-4 col-11 pb-1 mb-4">
                    <div class="card-body">
                        <div class="row justify-content-start">
                            <div class="col-auto">
                                <img class="rounded-circle"
                                    src="${ownerAvt}"
                                    alt="Profile Picture" style="width: 30px; height: 30px;">
                            </div>
                            <div class="col p-0">
                                <h6 class="mb-0 p-0" id="name">${ownerName}</h6>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-10 pe-2">
                                <div>${comment.content}</div>
                                <div id="img${comment._id}">
                                    <img class="col-lg-12m col-12 mb-lg-12 rounded-2" src="${comment.imgUrl}" style="width: 200px">
                                </div>
                            </div>
                            <div class="col d-flex align-items-center justify-content-between"> 
                                <div class="row justify-content-between">
                                    <label class="px-4 col btn btn-outline-danger ${bgColor} ${color}" id="like_${comment._id}" onclick="handleLikeBtn(${isLogin}, '${id}', 'comment')">
                                        <i class="bi bi-heart"></i>
                                    </label>
                                    <button class="px-4 ms-2 col btn btn-primary" onclick=showReplyCommentInp(${isLogin},'${parentId}')>
                                        <i class="bi bi-arrow-return-left"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            `;
        });
        var contents = await Promise.all(promises);
        var content = contents.join('');
        $(`#replyCommentList${parentId}`)[0].innerHTML = content;
        $(`#replyCommentList${parentId}`)[0].innerHTML += `
            <div class="col-12 replyCommentInp" id="${parentId}" ></div>`;
    } catch (err) {
        console.error(err);
    }
}

async function renderComments(blogId, isLogin) {
    try {
        var data = await axios.get(
            `http://localhost:3000/comment/getBlogComments?blogId=${blogId}`,
        );
        var comments = data.data;
        var promises = comments.map(async (comment) => {
            var ownerComment = await axios.get(
                `http://localhost:3000/user/getById?id=${comment.userId}`,
            );
            var ownerName =
                ownerComment.data.name == 'CastError'
                    ? 'Người dùng HappyMinds'
                    : ownerComment.data.name;
            var ownerAvt =
                ownerComment.data.photoUrl == 'CastError'
                    ? 'https://media.istockphoto.com/id/1196083861/vi/vec-to/b%E1%BB%99-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%C4%91%E1%BA%A7u-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-%C4%91%C6%A1n-gi%E1%BA%A3n.jpg?s=612x612&w=0&k=20&c=7juGotIovn0c2KFGhZ_DcEqpfiSyYl-zz2ty9XYnYNs='
                    : ownerComment.data.photoUrl;
            var responseText = comment.responseTimes
                ? `Hiển thị thêm ${comment.responseTimes} lượt phản hồi`
                : '';
            var commentId = comment._id;
            var likedList = comment.likedList;
            var bgColor = '';
            var color = '';
            if (isLogin && likedList.includes(user?._id)) {
                bgColor = 'redColor';
                color = 'whiteColor';
            }
            return `
            <div class="card mt-4 col-9 pb-1 mb-4 replyCommentParent" style="position: relative;">
                <div class="card-body ">
                    <div class="row justify-content-start">
                        <div class="col-auto">
                            <img class="rounded-circle"
                                src="${ownerAvt}"
                                alt="Profile Picture" style="width: 30px; height: 30px; object-fit: contain;">
                        </div>
                        <div class="col p-0">
                            <h6 class="mb-0 p-0" id="name">${ownerName}</h6>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-10 pe-2">
                            <div>${comment.content}</div>
                            <div id="img${commentId}">
                                <img class="col-lg-12m col-12 mb-lg-12 rounded-2 " src="${comment.imgUrl}" style="width: 200px">
                            </div>
                        </div>
                        <div class="col d-flex align-items-center justify-content-between"> 
                            <div class="row justify-content-between">
                                <label class="px-4 col btn btn-outline-danger ${bgColor} ${color}" id="like_${commentId}" onclick="handleLikeBtn(${isLogin}, '${commentId}', 'comment')">
                                    <i class="bi bi-heart"></i>
                                </label>
                                <button class="px-4 ms-2 col btn btn-primary" onclick="showReplyCommentInp(${isLogin}, '${commentId}')">
                                    <i class="bi bi-arrow-return-left"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="position:relative;left:40px;" id="replyCommentList${commentId}">
                    <b onmouseover="this.style.cursor='pointer'" onmouseout="this.style.cursor='default'" onclick="renderReplyComments('${commentId}', ${isLogin})">${responseText}</b>
                    <div class="col-12 replyCommentInp" id="${commentId}" ></div>
                </div>
            </div>
        `;
        });
        var contents = await Promise.all(promises);
        var content = contents.join('');
        $('#commentList')[0].innerHTML = content;
    } catch (error) {
        console.error(error);
    }
}

function showReplyCommentInp(isLogin, commentId) {
    if (!isLogin) {
        $('#login_form').modal('show');
    } else {
        document.getElementById(commentId).innerHTML = `
            <div class="d-flex justify-content-start card mt-4 col-11 pb-1 mb-4">
                <div class="card-body ">
                    <div class="row justify-content-start">
                        <div class="col-auto">
                            <img class="rounded-circle"
                                src=${user.photoUrl}
                                alt="Profile Picture" style="width: 30px; height: 30px; object-fit: contain;">
                        </div>
                        <div class="col p-0">
                            <h6 class="mb-0 p-0" id="name">You</h6>
                        </div>
                        <div class="col-auto pe-2" onclick=cancelComment("replyCommentInp")>
                            <button class="btn btn-outline-danger">
                                <i class="bi bi-x-circle-fill"></i>
                            </button>
                        </div>
                    </div>
                    <form id="replyCommentForm" class="row mt-3">
                        <div class="col-10 pe-2">
                            <input type="text" class="form-control" name="content" id="replyCommentInp"
                                placeholder="Type your review comment . . .">
                            <input type="hidden" id="hiddenInput" name="parentId" value="${commentId}">
                        </div>
                        <label class="col btn btn-outline-secondary pe-2">
                            <i class="bi bi-upload"></i>
                            <input type="file" id="imgInput" name="imgUrl" style="display: none;" onchange="displayImage('replyImage')">
                        </label>
                        <button class="col btn btn-primary ms-2 me-2" onclick=submitComment(${isLogin},"replyCommentForm")> 
                            <i class="bi bi-send"></i>
                        </button>
                        <div class="mt-3">
                            <img id="replyImage" src="" alt="updation Image"
                            style="max-width: 300px; max-height: 300px; display: none;">
                        </div>
                    </form>
                </div>
            </div>
        `;
        $('#replyCommentInp')[0].focus();
    }
}

function displayImage(id) {
    var fileInput = event.target;
    var previewImage = document.getElementById(id);
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            console.log(previewImage);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

setTimeout(function () {
    var link = window.location.href;
    document.getElementById('linkPost').value = link; // Set value of 'linkPost' to the current URL
}, 200);

function sharePost() {
    document.getElementById('linkPost').value = 'Coppied!'; // Set value of 'linkPost' to the current URL
    var linkToCopy = window.location.href; // Link to share with the user
    var textarea = document.createElement('textarea');
    textarea.value = linkToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        navigator.clipboard.writeText(textarea.value);
    } catch (err) {
        console.error('Unable to copy', err);
    }
    document.body.removeChild(textarea);
}

function cancelComment(id) {
    document.getElementById(`${id}`).value = '';
}
