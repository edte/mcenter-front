$.ajax({
    xhrFields: {
        withCredentials: true    // 前端设置是否带cookie
    },
    crossDomain: true,   // 会让请求头中包含跨域的额外信息，但不会含cookie
    dataType: "json"
})
