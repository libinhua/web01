/*
    bootstrap 自定义js验证（正在完善..）
    data-checkid : 字段Id
    data-check: notnull|null|phone|identity  多个验证用,分开(目前只开发这三种) null为选填字段不验证
    var lc_languages={[check:"",value:""]} 提示语



*/


jQuery.lccheck = {
    List: [],
    ISXin: true,
    ShowTimeout: 2000,
    Languages: [{ check: "notnull", value: "这个字段是必须的" }
	, { check: "phone", value: "手机格式输入不正确" }, { check: "identity", value: "身份证格式输入不正确" }],
    Init: function () {

        $.lccheck.List = [];//初始化界面
        var $dataRequired = $("[data-checkid]");

        if ($dataRequired.length > 0) {
            $dataRequired.each(function (index, obj) {
                var data = {
                    ID: $(obj).attr("data-checkid"),
                    Check: $(obj).attr("data-check")
                }
                $(obj).attr("data-placement", "top");//提示框显示在上方
                $(obj).attr("data-trigger", "manual");//手动提示
                $(obj).attr("data-title", "提示");//提示标题
                $(obj).attr("data-content", "");
                var prt = $(obj).parent();
                if (!prt.hasClass("has-feedback")) {
                    prt.addClass("has-feedback");
                };
                if ($.lccheck.ISXin && data.Check.indexOf("notnull") >= 0) {//如果是必填字段 添加*号
                    var $ctrl = prt.find(".form-control-feedback");
                    if ($ctrl.length === 0) {
                        $ctrl = $("<span class='form-control-feedback'>*</span>");
                        prt.append($ctrl);
                    }
                }
                $.lccheck.List.push(data);
            });
        };
    },
    /**
		 * 直接将输入项生成一个object
		 * @returns {} 
		 */
    MakeObject: function () {
        var o = {
            Id: this._id
        };
        $(this.List).each(function (index, data) {
            var obj = $("[data-checkid='" + data.ID + "']");
            o[data.ID] = $.lccheck.ValOfObj(obj);
        });
        return o;
    },
    ValOfObj: function (obj) {
        var $obj = $(obj);
        var xvalue = $obj.val();
        if ($obj.attr("type") == 'checkbox') {
            xvalue = $obj.is(':checked');
        }
        //if ($obj.is(":checkbox")) {
        //    xvalue = $obj.attr("value");
        //    return xvalue === undefined ? false : xvalue;
        //}
        return xvalue;
    },
    IsValid: function () {

        for (var i = 0; i < $.lccheck.List.length; i++) {
            var data = $.lccheck.List[i];
            var obj = $("[data-checkid='" + data.ID + "']");
            var value = $.lccheck.ValOfObj(obj);
//          debugger;
            if (data.Check.indexOf("notnull") >= 0) {//非空验证
                if (value === null || value === "") {//验证不通过
                    $.lccheck.Show(data.ID, $.lccheck.GetMess("notnull"));
                    return false;
                }
            }
            if (data.Check.indexOf("phone") >= 0) {//手机号验证
                var myreg = /^(1[3-8][0-9])+\d{8}$/;
                if (!myreg.test(value)) {
                    $.lccheck.Show(data.ID, $.lccheck.GetMess("phone"));
                    return false;
                }
            }
            if (data.Check.indexOf("identity") >= 0) {//身份证号验证
                var myreg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
                if (!myreg.test(value)) {
                    $.lccheck.Show(data.ID, $.lccheck.GetMess("identity"));
                    return false;
                }
            }
        }
        return true;
    },
    Hide: function () {
        $("[data-checkid]").popover('hide');
    },
    GetMess: function (chekc) {
        for (var i = 0; i < $.lccheck.Languages.length; i++) {
            var data = $.lccheck.Languages[i];
            if (data.check === chekc) {
                return data.value;
            }
        }
        return "Error.";
    },
    Show: function (checkid, mess) {
        var obj = $("[data-checkid='" + checkid + "']");
        $(obj).focus();
        $(obj).attr("data-content", mess);
        $(obj).popover('show');//弹出提示
        setTimeout("$.lccheck.Hide()", $.lccheck.ShowTimeout);
    }

}

