$(document).ready(function () {
	 $('#dlg_form').bootstrapValidator({
　　　　　　　　message: 'This value is not valid',
            　feedbackIcons: {
                　　　　　　　　valid: 'glyphicon glyphicon-ok',
                　　　　　　　　invalid: 'glyphicon glyphicon-remove',
                　　　　　　　　validating: 'glyphicon glyphicon-refresh'
            　　　　　　　　   },
            fields: {
                UserName: {
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        }
                    }
                },
                Password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        }
                    }
                },
                IdentifyingCode:{
                    validators:{
                        notEmpty:{
                            message:'验证不能为空'
                        }

                  }
                },
                Email:{
                    validators:{
                        notEmpty:{
                            message:'邮箱不能为空'
                        },
                        regexp : {
                            regexp : /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
                            message : '输入正确的邮箱'
                        }
                  }
                },
                Code:{
                    validators:{
                        notEmpty:{
                            message:'验证不能为空'
                        }
                  }
                },
                CompanyName:{
                    validators:{
                        notEmpty:{
                            message:'公司名称不能为空'
                        }
                  }
                },
                CompanyCode:{
                    validators:{
                        notEmpty:{
                            message:'组织机构代码不能为空'
                        },
                        regexp:{
                            regexp:/^[A-Za-z0-9]+$/,
                            message:"组织机构代码只能为数字和字母组成"
                        }
                  }
                },
                ContractNumber:{
                    validators:{
                        notEmpty:{
                            message:'合同号不能为空'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9]+$/,
                            message: '合同号只能为数字和字母组成'
                        }
                       

                  }
                },
                LinkMan:{
                    validators:{
                        notEmpty:{
                            message:'联系人不能为空'
                        }
                  }
                },
                Phone:{
                    validators:{
                        notEmpty:{
                            message:'联系电话不能为空'
                        },
                        regexp : {
                            regexp : /^1[34578]\d{9}$/,
                            message : '输入正确的手机号码'
                        }

                  }
                }

            }
    });
});
