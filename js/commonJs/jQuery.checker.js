/**
 * 扩展jQuery用于自定义校验
 * 校验条件：
 *     1、 data-required = "[条件匹配原则:]字段名称
 *     2、 data-option   = "[条件匹配原则:]字段名称[:限制长度]
 *     
 *  条件匹配原则(可选)：
 *      输入字段需要怎么进行匹配，如：email，使用email规则。若为空，则使用不为空条件进行匹配
 *      
 *  限制长度：
 *    不需要，可以使用maxlength进行设定
 *
 *   <div class="input-group  has-feedback">
         <span class="input-group-addon"><span class="icon-desktop"><label for="txtAppName" class="inputLabel">App 名称</label></span></span>
         <input id="txtAppName" type="text" class="form-control" data-required="AppName"/>
         <span class="glyphicon glyphicon-remove form-control-feedback"></span>
     </div>
 *
 *
 *  使用方法
 *    function pick(obj, fields, checker) {
        $(fields.split(",")).each(function(index,field) {
            obj[field] = checker.Get(field);
        });
    }

    function doSubmit() {
        
        var $c = $.checker;
        if ($c.IsValid()) {
            //debugger;
            var o = {};
            pick(o, "Caption,Software,Version,State,Remarks", $c);
            console.info(o["Caption"]);

            var o2 = $.checker.MakeObject();
            console.info(o2["Caption"]);

            var o3 = $.checker.MakeSpecialObj("Caption,Software,Version,State,Remarks");
            console.info(o3["Caption"]);
        }
    }

    $(function() {
        $.checker.Init();
    });
 */
jQuery.checker = {

    /**
     * 存放主键的值(只读)
     */
    Id: null,
    /**
     * 初始化校验器
     * @param {} idUrl 获取某个资源的action url
     * @constructor
     */
    Init: function (idUrl) {
        this._isNew = true;
        //存储攻取到的输入对象
        this.fields = [];
        //查找必填字段
        var $dataRequired = $("[data-required]");
        if ($dataRequired.length > 0) {
            $dataRequired.each(function (index, obj) {
                //取出必填字段的条件值
                var v = ($(obj).attr("data-required")).split(":");
                if (v.length > 2) {
                    return true;
                }
                var item = {
                    Target: $(obj),
                    NeedCheck: true,
                    Match: null
                };
                if (v.length === 1) { //只有字段名称
                    item.Field = v[0];
                } else if ($.length === 2) { //包含条件匹配与字段名称
                    item.Match = v[0];
                    item.Field = v[1];
                }

                //查找 label for
                var $label = $(obj).parent().find("label");
                if ($label.length > 0) {
                    item.Message = $label.text();
                } else {//在没有label的情况下试图查找 placeholder
                    var holder = $(obj).attr("placeholder");
                    if (holder) {
                        item.Message = holder;
                    }
                }

                //加入到数组
                $.checker.fields.push(item);
                //给父对象添加 has-feedback
                var prt = $(obj).parent();
                if (!prt.hasClass("has-feedback")) {
                    prt.addClass("has-feedback");
                };
                var $ctrl = prt.find(".form-control-feedback");
                if ($ctrl.length === 0) {
                    $ctrl = $("<span></span>");
                    $ctrl.addClass("glyphicon form-control-feedback").hide();
                    prt.append($ctrl);
                } else {
                    $ctrl.hide();
                }

                //在父级下添加一个星号
                var $span = $("<span></span>");
                var $em = $("<em></em>");
                $em.text("*");
                $span.append($em).addClass("form-control-feedback");
                prt.append($span);

                return true;
            });
        }
        //查找可选填字段
        var $dataOption = $("[data-option]");
        if ($dataOption.length > 0) {
            $dataOption.each(function (index, obj) {
                var v = $(obj).attr("data-option");
                if (v) {
                    var item = {
                        Target: $(obj),
                        Field: v,
                        NeedCheck: false,
                        Match: null,
                        Message: null
                    };
                    //加入到数据
                    $.checker.fields.push(item);
                }
            });
        }

        $.checker._id = "==goldli@163.com==";

        //查找id字段
        var $idField = $("[data-requited-id]");
        if ($idField.length > 0) {
            var id = $idField.attr("data-requited-Id");
            if (id) {
                $.checker._id = id;
                $.jsonp.apiGet(idUrl + "/" + id, function (result) {
                    if (result.State === 0) {
                        //将数据填充到控件
                        $.checker.Set(result.Data);
                        $idField.remove();
                    }
                });
            }
        }

        this._inited = true;
    },

    /**
     * 给控件赋值
     * @param {} data 
     * @returns {} 
     */
    Set: function (data, predicate) {
        //将数据填充到控件
        if (predicate) {
            $.each($.checker.fields, function (index, item) {
                var r = predicate(item.Target, data[item.Field]);
                if (!r) {
                    item.Target.val(data[item.Field]);
                }
            });
        } else {
            $.each($.checker.fields, function (index, item) {
                var v = data[item.Field];
                if (item.Target.is(":checkbox") && v) {
                    item.Target.attr("checked", "true");
                    item.Target.attr("value", "true");
                } else if (/\/Date\(\d+\)\//.test(v)) {//增加对时间的判断 	"/Date(1556899200000)/"
                    var milliseconds = parseInt(v.replace(/\D/igm, ""));
                    var d = new Date(milliseconds);
                    item.Target.val(d.toLocaleDateString().replace(/(\d+)[^\d](\d+)[^\d](\d+)[^\d]/, "$1-$2-$3"));//日期转换为本地时间
                } else {
                    item.Target.val(v);
                }
            });
        };
        $.checker._id = data.Id;
        this._isNew = false;
    },

    /**
     * 判断输入是否符合要求
     * @constructor
     */
    IsValid: function () {
        if (!this._inited) {
            this.Init();
        }
        //强制进入调试状态　debugger;
        var result = true;
        var list = this.fields;
        for (var i = 0; i < list.length ; i++) {
            var item = list[i];
            if (item.NeedCheck) {
                //取消原有样式
                var $prt = item.Target.parent();
                $prt.removeClass("has-success").removeClass("has-error");
                var $extCtrl = $prt.find(".form-control-feedback");
                $extCtrl.removeClass("glyphicon-ok").removeClass("glyphicon-remove");

                //取出值
                var itemValue = item.Target.val();
                //取出判断条件，进行判断
                var isOk = itemValue !== "";
                //添加样式
                $prt.addClass(isOk ? "has-success" : "has-error");
                $extCtrl.addClass(isOk ? "glyphicon-ok" : "glyphicon-remove").show();

                //回写值
                if (!isOk) {
                    result = false;
                }
                //删除星号
                var $spans = $prt.find("span").last();//
                if ($spans.is("span.form-control-feedback")) {
                    $spans.remove();
                }
            }
        }
        return result;
    },

    /**
     * 判断输入是否符合要求
     * @constructor
     */
    IsValid2: function () {
        if (!this._inited) {
            this.Init();
        }
        //强制进入调试状态　debugger;
        var list = this.fields;
        for (var i = 0; i < list.length ; i++) {
            var item = list[i];
            if (item.NeedCheck) {
                //取出值
                var itemTar = item.Target;
                var itemValue = itemTar.val();
                var mess = item.Message;
                //取出判断条件，进行判断
                var isOk = itemValue !== "";

                //回写值
                if (!isOk) {
                    return { State: false, Message: mess }
                }
            }
        }
        return { State: true, Message: "" }
    },

    IsValid3: function () {
        if (!this._inited) {
            this.Init();
        }
        //强制进入调试状态　debugger;
        var list = this.fields;
        for (var i = 0; i < list.length ; i++) {
            var item = list[i];
            if (item.NeedCheck) {
                //取出值
                var itemTar = item.Target;
                var itemValue = itemTar.val();
                var mess = item.Message;
                //取出判断条件，进行判断
                var isOk = itemValue !== "";
                var mes = item.Field;
                //回写值
                $('#example').popover("show")

                if (!isOk) {
                    return { State: false, Message: item.Field }
                }
            }
        }
        return { State: true, Message: "" }
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

    /**
     * 获取某输入字段的值
     * @param field 数据字段的值
     * @constructor
     */
    Get: function (field) {
        var result = null;
        $(this.fields).each(function (index, obj) {
            if (obj.Field === field) {
                result = $.checker.ValOfObj(obj.Target);
                return false;
            }
            return true;
        });
        return result;
    },

    RemoveCss: function () {
        $(this.fields).each(function (index, obj) {
            var $prt = obj.Target.parent();
            $prt.removeClass("has-success").removeClass("has-error");
            var $extCtrl = $prt.find(".form-control-feedback");
            $extCtrl.removeClass("glyphicon-ok").removeClass("glyphicon-remove");
        });
    },

    Reset: function () {
        this._id = null;
        $(this.fields).each(function (index, obj) {
            obj.Target.val(null);
        });
        this._isNew = true;
    },

    /**
     * 是否为新增的数据
     */
    isNew: false,

    /**
     * 直接将输入项生成一个object
     * @returns {} 
     */
    MakeObject: function () {

        var o = {
            Id: this._id
        };
        $(this.fields).each(function (index, obj) {
            o[obj.Field] = $.checker.ValOfObj(obj.Target);
        });
        return o;
    },

    /**
     * 根据指定的字段生成Object
     * @param {} fields 以逗号分隔的字符串
     * @returns {} 
     */
    MakeSpecialObj: function (fields) {
        var o = {
            Id: this._id
        };
        $(fields.split(",")).each(function (index, field) {
            o[field] = $.checker.Get(field);
        });
        return o;
    }
};

/**
 * 创建只读的id属性
 */
Object.defineProperty(jQuery.checker, "Id", {
    get: function () {
        return this._id;
    }
});

Object.defineProperty(jQuery.checker, "isNew", {
    get: function () {
        return this._isNew;
    }
});
