var SizeEnum = {
  SUCCESS: "0",                   //成功
  UNKNOWN: "-1",                  //未知错误
  PARAMETERERROR: "-2",           //参数错误
  NOPERMISSION:"-3",              //没有权限
  METHODEXPIRED: "-4",            //该方法已经过期
  APICALLTOOFAST:"-5",            //接口调用太频繁
  NOTUID:"-6",                    //没有UID
  REGISTERTOOMANY:"-1102",        //注册太频繁    
  REGISTERCODEERROR:"-1103",      //注册验证码错误
  USERNAMEISEXIST:"-1104",        //用户账号重复
  COMPANYNAMEISEXIST:"-1105",     //公司名称重复
  COMPANYCODEISEXIST:"-1106",     //组织机构代码重复
  USERNOTEXISTORNOTENABLED:"-1201",  //用户不存在或未被启用
  USERNAMEORPASSWORDERROR:"-1202",   //用户名或密码错误
  COMPANYNOTAUDIT:"-1203",        //用户未审核
  FAILUREPASSAUDIT:"-1204",       //用户未通过审核
  IDENTIFYINGCODEERROR:"-1205",   //验证码错误
  properties: {
    "0": { value: "0", msg: "成功"},
    "-1": {value: "-1", msg: "未知错误"},
    "-2": {value: "-2", msg: "参数错误"},
    "-3": {value: "-3", msg: "没有权限"},
    "-4": {value:  "-4", msg: "该方法已经过期"},
    "-5": {value: "-5", ms: "接口调用太频繁"},
    "-6": {value: "-6", msg: "没有UID"},
    "-1102": {value:  "-1102", msg: "注册太频繁"},
    "-1103": {value: "-1103", msg: "注册验证码错误"},
    "-1104": {value: "-1104", msg: "用户账号重复"},
    "-1105": {value:  "-1105", msg: "公司名称重复"},
    "-1106": {value: "-1106", msg: "组织机构代码重复"},
    "-1201": {value: "_1201", msg: "用户不存在或未被启用"},
    "-1202": {value:  "-1202", msg: "用户名或密码错误"},
    "-1203": {value: "-1203", comsgde: "用户未审核"},
    "-1204": {value: "-1204", msg: "用户审核未通过"},
    "-1205": {value:  "-1205", msg: "验证码错误"}
  }
};
