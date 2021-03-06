function showMessageForm() {
    let opVal = $("#addMessage").val();
    switch (opVal) {
        case "wechat":
            $("#message-email").hide();
            $("#message-wechat").show();
            break
        case "email":
            $("#message-wechat").hide();
            $("#message-email").show();
            break
        case "sms":
            $("#message-wechat").hide();
            $("#message-email").hide();
            break
    }
}

function addMessage() {
    let data = {
        tid: document.getElementById("message-tid").value,
        receivers: document.getElementById("message-to").value,
        variables: [{
            "key": document.getElementById("message-key1").value,
            "value": document.getElementById("message-val1").value
        }, {
            "key": document.getElementById("message-key2").value,
            "value": document.getElementById("message-val2").value
        }, {
            "key": document.getElementById("message-key3").value,
            "value": document.getElementById("message-val3").value
        }, {
            "key": document.getElementById("message-key4").value,
            "value": document.getElementById("message-val4").value
        }]
    }

    console.log(data)

    $.post("/test/send", {data: JSON.stringify(data)}, (data, status) => {
        console.log(data)
        console.log(status)
        alert(data["data"])
    });
}

function getOpenid(sto) {
    let d;
    $.get("/test/openid?stuNum=" + sto, (data, status) => {
        d = data
        alert(status)
    })
    return d
}

function getStatus() {
    $.get("/message/status?sid=" + document.getElementById("status").value, (data, status) => {
        console.log(data["s"]["0"])

        let templates = [];

        let j = data["s"]["0"];

        console.log(j)

        templates.push({
            time: j["CreatedAt"],
            sid: j["Sid"],
            to: j["Receiver"],
            ssid: j["Ssid"],
            cron: j["Cron"],
            data: j["Data"],
            result: j["Result"],
        })

        console.log(templates)

        //??????????????????????????????
        let container = document.querySelector('#container1');
        //???????????????????????????????????????dom?????????????????????????????????????????????innerHTML???
        let templateDom = document.querySelector('#template1');
        //???????????????????????????
        let template = Handlebars.compile(templateDom.innerHTML);
        //???????????????????????????student???????????????
        container.innerHTML = template(templates);
    });
}