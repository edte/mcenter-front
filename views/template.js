function listTemplate() {
    $("#xxx").show();

    $.get("/template/list", (data) => {
        let templates = [];

        data["data"].forEach((v) => {
            let j = eval("(" + v["Data"] + ")");

            templates.push({
                type: getType(j["type"]),
                tid: v["Tid"],
                alias: v["Alias"],
                format: JSON.stringify(j["format"]).toString()
            })
        })

        console.log(templates)

        //获取需要放数据的容器
        let container = document.querySelector('#container');
        //也就是获取我们定义的模板的dom对象。主要是想获取里面的内容（innerHTML）
        let templateDom = document.querySelector('#template');
        //编译模板的里的内容
        let template = Handlebars.compile(templateDom.innerHTML);
        //把后台获取到的数据student渲染到页面
        container.innerHTML = template(templates);
    });
}

function getType(t) {
    switch (t) {
        case 0:
            return "wechat"
        case 1:
            return "email"
        case 2:
            return "Sms"
        case 3:
            return "Android"
        case 4:
            return "IOS"
    }
}

function getTypeId(t) {
    switch (t) {
        case "wechat":
            return 0
        case "email":
            return 1
        case "Sms":
            return 2
        case "Android":
            return 3
        case "IOS":
            return 4
    }
}

function hideTemplate() {
    $("#xxx").hide();
}

function hideAddTemplate() {
    $("#xxx").hide();
}

function showForm() {
    let opVal = $("#addTemplateSelect").val();
    console.log(opVal)
    switch (opVal) {
        case "wechat":
            $("#email-form").hide();
            $("#wechat-form").show();
            break
        case "email":
            $("#wechat-form").hide();
            $("#email-form").show();
            break
        case "sms":
            $("#wechat-form").hide();
            $("#email-form").hide();
            break
    }
}

function wechatDeal() {
    let dd = {
        type: 0,
        format: {
            "template_id": document.getElementById('tid').value,
            "data": {
                "first": {
                    "value": document.getElementById("first").value,
                },
                "keyword1": {
                    "value": document.getElementById("keyword1").value,
                },
                "keyword2": {
                    "value": document.getElementById("keyword2").value,
                },
                "keyword3": {
                    "value": document.getElementById("keyword3").value,
                },
                "keyword4": {
                    "value": document.getElementById("keyword4").value,
                },
                "remark": {
                    "value": document.getElementById("remark").value,
                },
            }
        }
    }
    console.log(dd)

    let aa = [{key: "KEYWORD1", value: document.getElementById("alias1").value}, {
        key: "KEYWORD2",
        value: document.getElementById("alias2").value
    }, {key: "KEYWORD3", value: document.getElementById("alias3").value}, {
        key: "KEYWORD4",
        value: document.getElementById("alias4").value
    }, {key: "KEYWORD5", value: document.getElementById("alias5").value},]

    console.log(aa)


    $.post("/template", {
        data: JSON.stringify(dd), alias: JSON.stringify(aa)
    }, (data, status) => {
        console.log(data)
        console.log(status)
        alert(data["tid"])
    });
}

function emailDeal() {
    let dd = {
        type: 1,
        format: {
            "subject": document.getElementById('subject').value,
            "text": document.getElementById('text').value
        }
    }

    console.log(dd)

    let aa = [
        {
            key: "KEYWORD1",
            value: document.getElementById("ema-alias1").value
        },
        {
            key: "KEYWORD2",
            value: document.getElementById("ema-alias2").value
        },
        {
            key: "KEYWORD3",
            value: document.getElementById("ema-alias3").value
        },
        {
            key: "KEYWORD4",
            value: document.getElementById("ema-alias4").value
        }]

    console.log(aa)

    $.post("/template", {
        data: JSON.stringify(dd), alias: JSON.stringify(aa)
    }, (data, status) => {
        console.log(data)
        console.log(status)
        alert(data["tid"])
    });
}

Object.defineProperty(HTMLFormElement.prototype, 'formdata', {
    get() {
        return new FormData(this);
    }
})

Object.defineProperty(HTMLFormElement.prototype, 'jsondata', {
    get() {
        const jsondata = {}
        const formdata = new FormData(this);
        formdata.forEach((value, key) => {
            if (!jsondata[key]) {
                jsondata[key] = formdata.getAll(key).length > 1 ? formdata.getAll(key) : formdata.get(key);
            }
        });
        return jsondata;
    }
})
