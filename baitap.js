const music = JSON.parse(localStorage.getItem("musicList")) || [
    {
        id: 1,
        name: "Thiên Lý Ơi",
        caSi: "Jack",
    },
    {
        id: 2,
        name: "Bạc Phận",
        caSi: "J97",
    },
    {
        id: 3,
        name: "Đom Đóm",
        caSi: "Trịnh Trần Phương Tuấn",
    },
];

const listMusic = document.querySelector("#songTable");
const formElement = document.querySelector(".form");
const titleElement = document.querySelector("#title");
const artistElement = document.querySelector("#artist");
const submitBtn = document.querySelector("#submitBtn");
const formTitle = document.querySelector("#formTitle");

const renderList = (data = music) => {
    let renderHtml = "";
    data.forEach((element) => {
        renderHtml += `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.caSi}</td>
                <td>
                    <button onclick="handleEdit(${element.id})">Sửa</button>
                    <button onclick="deleteSong(${element.id})">Xóa</button>
                </td>
            </tr>
        `
    });
    listMusic.innerHTML = renderHtml;
}

const handleSubmit = () => {
    if(titleElement.value && artistElement.value ) {
        const newMusic = {
            id: music.length > 0 ? music[music.length - 1].id + 1 : 1,
            name : titleElement.value,
            caSi : artistElement.value,
        };
        music.push(newMusic);
        saveToStorage();
        renderList();
        titleElement.value = "";
        artistElement.value = "";
    }else {
        alert("Không được để trống tên bài hát và ca sĩ !");
    }
}

renderList();

const saveToStorage = () => {
    localStorage.setItem("musicList", JSON.stringify(music));
}

const deleteSong = (id) => {
    if (confirm("Xác nhận xóa?")) {
        const index = music.findIndex(s => s.id === id);
        music.splice(index, 1);
        saveToStorage();
        renderList();
    }
}

const handleEdit = (id) => {
    const song = music.find(s => s.id === id);
    titleElement.value = song.name;
    artistElement.value = song.caSi;

    formTitle.innerText = "Sửa bài hát";
    submitBtn.innerText = "Cập nhật";
    submitBtn.setAttribute("onclick", `handleUpdate(${id})`);
}

const handleUpdate = (id) => {
    if (titleElement.value && artistElement.value) {
        const index = music.findIndex(s => s.id === id);
        music[index].name = titleElement.value;
        music[index].caSi = artistElement.value;

        saveToStorage();
        renderList();

        titleElement.value = "";
        artistElement.value = "";
        formTitle.innerText = "🎵 Thêm bài hát";
        submitBtn.innerText = "Thêm";
        submitBtn.setAttribute("onclick", "handleSubmit()");
    } else {
        alert("Không được để trống!");
    }
}

const searchSong = () => {
    const value = document.querySelector("#search").value.toLowerCase();
    const result = music.filter(s => s.name.toLowerCase().includes(value));
    renderList(result);
}