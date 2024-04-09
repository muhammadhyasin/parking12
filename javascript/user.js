async function V1() {
    fetch('https://blr1.blynk.cloud/external/api/get?token=yY_KIuasiO9Dk40tj6SwO4oyhxM_F6tQ&V1').then(
    res => {
        return res.json()
    }
).then(data => {
    if (data == 1) {
        document.getElementById('V1').innerText = "occupied"
    }
    else {
        document.getElementById('V1').innerText = "not occupied"
    }
})
}

async function V2() {
    fetch('https://blr1.blynk.cloud/external/api/get?token=yY_KIuasiO9Dk40tj6SwO4oyhxM_F6tQ&V2').then(
    res => {
        return res.json()
    }
).then(data => {
    if (data == 1) {
        document.getElementById('V2').innerText = "occupied"
    }
    else {
        document.getElementById('V2').innerText = "not occupied"
    }
})
}

// Call the functions every 1 second
setInterval(async function() {
    await Promise.all([V1(), V2()]);
}, 1000);

