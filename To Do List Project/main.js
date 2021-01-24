window.onload = () => {
    loadData();
}



const wrap = document.getElementById("wrap");
const form = document.getElementById("main");

let allTasks = [];

function clearInput() {
    form.reset();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const textarea = document.getElementById('text');
    const inputDate = document.getElementById('date');
    const inputTime = document.getElementById('time');


    const allTaskIds = allTasks.length === 0 ? [0] : allTasks.map(task => task.id); 

     
    const lastId = Math.max(...allTaskIds) + 1; 

    displayTask(lastId, textarea.value, inputDate.value, inputTime.value);
    addItem(lastId, textarea.value, inputDate.value, inputTime.value);
    clearInput();
});

function loadData() {
    allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];

    allTasks.forEach(({ id, text, date, time, checked }) => {
        displayTask(id, text, date, time, checked);
    });
}

function displayTask(id, textarea, inputDate, inputTime, checked) {
    const div = document.createElement("div");
    div.setAttribute("class", `note displayTask ${checked ? 'checked' : ''}`);

    div.innerHTML = `
            <img src="note-bg.png" alt="note">
            <i class="delete far fa-times-circle"></i>
            <i class="checked far fa-check-circle"></i>
            <p class="px-3 first-para">${textarea}</p>
            <p class="second-para">Date: ${inputDate}</p>
            <br><br>
            <p class="three-para">Time: ${inputTime}</p>
        `;

    wrap.append(div);

    if (inputTime == "") {
        div.children[7].innerHTML = ""
    }


    if (checked) {
        div.children[2].classList = "checked fas fa-check-circle"
    }


    div.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
            removeItem(id);
        }

        if (e.target.classList.contains('checked')) {
            checkedTask(id, e.target.parentElement);
        }
    });


}


function addItem(id, text, date, time, checked) {
    allTasks.push({
        id,
        text,
        date,
        time,
        checked: false
    });

    saveInLocalStorage();
}

function checkedTask(id, parent) {


    const selectedTaskIndex = allTasks.findIndex((task) => task.id === id);


    if (selectedTaskIndex != -1) {
        allTasks[selectedTaskIndex].checked = !allTasks[selectedTaskIndex].checked;
        parent.classList.contains('checked') ? parent.classList.remove('checked') : parent.classList.add("checked");
    }


    if (allTasks[selectedTaskIndex].checked) {
        parent.children[2].classList = "checked fas fa-check-circle";

    } else {
        parent.children[2].classList = "checked far fa-check-circle";
    }



    saveInLocalStorage();
}

function removeItem(id) {
    allTasks = allTasks.filter(task => task.id !== id);
    saveInLocalStorage();
}

function saveInLocalStorage() {
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
}
