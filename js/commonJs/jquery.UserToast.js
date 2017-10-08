
var user_toast_duration = 2000; //配置存在时间
var user_toast_panel_id = "i_body";// 提示父区域ID
var user_toast_top = 35;             //top位置
var user_toast_left = 45;            //left 位置

jQuery.UserToast = {
    SetConfig: function (duration, panel_id, top, left) {
        user_toast_duration = duration;
        user_toast_panel_id = panel_id;
        user_toast_top = top;
        user_toast_left = left;
    },
    ShowInfo: function (msg) {
        $.UserToast.TheShow("alert-info",msg);
    },
    ShowErr: function (msg) {
        $.UserToast.TheShow("alert-error", msg);
    },
    TheShow: function (cname, msg) {
        var text = '<a href="#"  data-dismiss="alert">';
        text += '<strong>提示！</strong>';
        text += msg + '&nbsp;&nbsp;&nbsp;';
        msg = text;
        var duration = isNaN(user_toast_duration) ? 3000 : user_toast_duration;
        var m = document.createElement('div');
        m.className = "alert " + cname;
        m.innerHTML = msg;
        m.style.cssText = "opacity:0.95;position: fixed;top: " + user_toast_top + "%;left: " + user_toast_left + "%;z-index: 999999;font-size: 12px;";
        document.getElementById(user_toast_panel_id).appendChild(m);
        setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () { document.getElementById(user_toast_panel_id).removeChild(m) }, d * 1000);
        }, duration);

    }




};