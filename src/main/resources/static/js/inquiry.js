"use strict";


// 사진 등록

const file_up = document.getElementById("file");
const filebox = document.getElementsByClassName("filebox");
const blob_img = document.getElementById("blob_img");
const previous_img = document.getElementById("previous_img");

file_up.addEventListener("change", () => {
    let file = file_up.files[0];
    let ext = file.type;
    let result = (/^image\//gi).test(ext);

    if (result) {
        if(previous_img != null) {
            previous_img.style.display = "none";
            delete_pre_img.style.display="none";
        }
        filebox[0].firstElementChild.style.display = "none";
        blob_img.src = window.URL.createObjectURL(file);
        blob_img.style.width = "200px";
    } else {
        blob_img.src = "";
        filebox[0].firstElementChild.style.display = "block";
        filebox[0].firstElementChild.innerHTML = "다른 파일 선택";

        // 사진 이외의 파일이면 등록버튼 잠궈주세요
    }
});


// 이전 사진 삭제
const delete_pre_img = document.getElementById("delete_pre_img");
if (delete_pre_img != null) {
    delete_pre_img.addEventListener("click", () => {
        previous_img.style.display="none";
        delete_pre_img.style.display="none";
    });
}

// 버튼

const save_btn = document.getElementById("btn-save");
const delete_btn = document.getElementById("btn-delete");
const update_btn = document.getElementById("btn-update");
const answer_btn = document.getElementById("btn-answer-save");

if (save_btn!=null)save_btn.addEventListener("click", save);
if (update_btn!=null)update_btn.addEventListener("click", update);


// 저장

function save() {

    let data = {
        title: $("#title").val(),
        content: $("#content_text").val()
    };

    // 사진 없을 때
    if (file_up.files[0] === undefined) {
        fetch("/api/inquiry/save", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then(() => {
                alert("등록되었습니다.")
                location.href = "/inquiry"
            })
            .catch(e => alert(e))
    } else {    // 사진 있을 때
        let form = document.getElementById("form");
        let formData = new FormData(form);

        formData.append('file', file_up.files[0]);
        formData.append("title", data.title);
        formData.append("content", data.content);

        fetch("/api/inquiry/saveFile", {
            method: 'POST',
            body: formData
        })
            .then(() => {
                alert("등록되었습니다.")
                location.href = "/inquiry"
            })
            .catch(e => alert(e + " 이미지"))
    }
}


// 수정
function update() {

    let id = $("#id").text();
    let data = {
        title: $("#title").val(),
        content: $("#content_text").val(),
        img : ""
    };

    // 사진을 지웠으면
    if (previous_img != null) {
        if(previous_img.style.display === "none") {
            data.img="delete";
        }
    }

    // 사진 없을 때
    if (file_up.files[0] === undefined) {
        fetch("/api/inquiry/update/" + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then(() => {
                alert("수정되었습니다.")
                location.href = "/inquiry"
            })
            .catch(e => alert(e))
    } else {    // 사진 있을 때
        let form = document.getElementById("form");
        let formData = new FormData(form);

        formData.append('file', file_up.files[0]);
        formData.append("title", data.title);
        formData.append("content", data.content);

        fetch("/api/inquiry/updateFile/" + id, {
            method: 'PUT',
            body: formData
        })
            .then(() => {
                alert("수정되었습니다.")
                location.href = "/inquiry"
            })
            .catch(e => alert(e + " 이미지"))
    }
}



