let currentTime = document.querySelector("h1");
let content = document.querySelector(".content");
let selectMenu = document.querySelectorAll("select");
let setAlarmbtn = document.querySelector("button");

let alarmTime, isAlarmSet, ringtone = new Audio("audio/alarm.mp3");

for(let i=12; i>0; i--){
    i = i < 10 ? `0${i}` : i;
    //9 to 1 added 0
    let option1 = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option1);
}
for(let i=59; i>=0; i--){
    i = i < 10 ? `0${i}` : i;
    //9 to 1 added 0
    let option1 = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option1);
}
for(let i=2; i>0; i--){
    let amp = i==1 ? "AM" : "PM"
    //9 to 1 added 0
    let option1 = `<option value="${amp}">${amp}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option1);
}

setInterval(()=>{
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let amp = "AM";
    if(h >= 12){
        h = h - 12;
        amp="PM"
    }
    
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerHTML = `${h}:${m}:${s} ${amp}`;

    if(alarmTime === `${h}:${m} ${amp}`){
        ringtone.play();
        ringtone.loop = true;
    }
});

setAlarmbtn.addEventListener("click", ()=>{
    if(isAlarmSet){
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmbtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Please, select a valid time to set Alarm!");
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable")
    setAlarmbtn.innerHTML = "clear Alarm";

});