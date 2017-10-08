function getparam(interface,version,content) {
   
    var obj2 = {
        Interface: interface,
        Version:version,
        Method: "post",
        Content: content,
        ContentType: "application/json"
    };
    return obj2;

}

function url(){

    return "http://user.docomcn.com:8052/api/gateway";
}