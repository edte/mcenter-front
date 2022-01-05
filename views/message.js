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

        //获取需要放数据的容器
        let container = document.querySelector('#container1');
        //也就是获取我们定义的模板的dom对象。主要是想获取里面的内容（innerHTML）
        let templateDom = document.querySelector('#template1');
        //编译模板的里的内容
        let template = Handlebars.compile(templateDom.innerHTML);
        //把后台获取到的数据student渲染到页面
        container.innerHTML = template(templates);
    });
}