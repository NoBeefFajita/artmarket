"use strict";


// 사진 등록

const file_up = document.getElementById("file");
const filebox = document.getElementsByClassName("filebox");
const blob_img = document.getElementById("blob_img");

file_up.addEventListener("change", () => {
    let file = file_up.files[0];
    let ext = file.type;
    let result = (/^image\//gi).test(ext);

    if (result) {
        filebox[0].firstElementChild.style.display = "none";
        let blobURL = window.URL.createObjectURL(file);
        blob_img.src = blobURL;
        blob_img.style.width = "200px";
    } else {
        blob_img.src = "";
        filebox[0].firstElementChild.style.display = "block";
        filebox[0].firstElementChild.innerHTML = "다른 파일 선택";

        // 사진 이외의 파일이면 등록버튼 잠궈주세요
    }
});


// 버튼

const save_btn = document.getElementById("btn-save");
const delete_btn = document.getElementById("btn-delete");
const update_btn = document.getElementById("btn-update");
const answer_btn = document.getElementById("btn-answer-save");

save_btn.addEventListener("click", save);


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
            .catch(e => alert(e + " 이미지"))
    }
}



