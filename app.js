var arr = []

function clock() {
    let hours = document.getElementById("hours");
    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");
    let session = document.getElementById("session");

    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();

    if (h >= 12) {
        session = session.innerText = "PM";
    } else {
        session = session.innerText = "AM";
    }

    if (h > 12) {
        h = h - 12;
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    hours.innerText = h;
    minutes.innerText = m;
    seconds.innerText = s;

    for (var i = 0; i < arr.length; i++) {
        var alarmStart = document.getElementById(`enableAlarm-${i}`).checked;
        if (arr[i].hour == h && arr[i].minute == m && alarmStart) {
            new Audio('Audio.mp3').play();
        }
        break;
    }

}

setInterval(clock, 1000);

function addAlarm(){
    var inp1 = document.getElementById('inp1');
    var inp2 = document.getElementById('inp2');
    if (inp1.value != '' && inp2.value != '') {
        inp1.value = (inp1.value < 10) ? "0" + inp1.value : inp1.value;
        inp2.value = (inp2.value < 10) ? "0" + inp2.value : inp2.value;
        arr.push({
            hour: parseInt(inp1.value),
            minute: parseInt(inp2.value)
        });

        var alarmId = arr.length - 1;
        var show = document.getElementById('show');
        console.log(inp1);
        show.innerHTML += `
<div id="show-${alarmId}" class="any">
    <h3>${inp1.value} : ${inp2.value}</h3>
    <div style='display: flex; flex-direction: row; align-items: center'>
        <div class="box" style='margin-right: 20px'>
            <input type="checkbox" id="enableAlarm-${alarmId}">
            <label for="enableAlarm-${alarmId}"></label>
            <span class="on"></span>
            </div>
            <i class="fa-solid fa-trash-can" id="trash" onclick="removeAlarm(${alarmId})"></i>
            </div>
            </div>`;
        inp1.value = '';
        inp2.value = '';
    }
}

function removeAlarm(index) {
    arr.splice(index, 1);

    var alarmElement = document.getElementById(`show-${index}`);
    if (alarmElement) {
        alarmElement.remove();
    }
}