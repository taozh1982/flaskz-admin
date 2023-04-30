//中文文字
z.setDefault({
    WIDGET_MESSAGEBOX_CONFIRM_TEXT: "确认",
    WIDGET_MESSAGEBOX_CANCEL_TEXT: "取消",

    PRO_GRID_OPERATE_UPDATE_LABEL: "编辑",
    PRO_GRID_OPERATE_DELETE_LABEL: "删除",

    PRO_GRID_RESULT_SUCCESS_LABEL: "成功",
    PRO_GRID_RESULT_FAIL_LABEL: "失败",

    PRO_AJAX_QUERY_TIPS: "查询",
    PRO_AJAX_ADD_TIPS: "添加",
    PRO_AJAX_CREATE_TIPS: "创建",
    PRO_AJAX_READ_TIPS: "读取",
    PRO_AJAX_UPDATE_TIPS: "编辑",
    PRO_AJAX_DELETE_TIPS: "删除",

    PRO_AJAX_UPLOAD_TIPS: "上传",

    PRO_AJAX_TIMEOUT_TIPS: "超时",
    PRO_AJAX_FORBIDDEN_TIPS: "禁止访问",
    PRO_AJAX_EXCEPTION_TIPS: "请求异常",
    PRO_AJAX_CLIENT_ERROR_TIPS: "请求错误",
    PRO_AJAX_SERVER_ERROR_TIPS: "服务器错误",
    PRO_AJAX_SUCCESS_TIPS: "成功",
    PRO_AJAX_FAIL_TIPS: "失败",

    PRO_MESSAGE_TIPS: "提示",
    PRO_MESSAGE_DELETE_CONFIRM: "确认删除?",

    PRO_MODAL_UPDATE_TITLE: "编辑",
    PRO_MODAL_ADD_TITLE: "添加",
    PRO_MODAL_VIEW_TITLE: "查看",

    PRO_MODAL_CONFIRM_TEXT: "确认",
    PRO_MODAL_CANCEL_TEXT: "取消"
});

z.form.Validator.registerRuleMessage({
    required: '请输入',
    integer: '请输入整数',
    numeric: '请输入数字',
    alphanumeric: '请输入字母/数字',
    alphanumeric_dash: '请输入字母/数字/中划线/下划线',
    alphanumeric_space: '请输入字母/数字/空格',
    email: '请输入Email',
    ipv4: '请输入IP地址',
    minlength: '该字段至少包含%p个字符',
    maxlength: '该字段不得超过%p个字符',
    greaterthan: '请输入大于%p的数字',
    lessthan: '请输入小于%p的数字',
    equal: '该字段必须和%p一致',
    match: '该字段必须和%p字段一致'
});

//图标
z.setDefault({
    PRO_GRID_OPERATE_UPDATE_LABEL: "<i class='fa fa-edit'></i>编辑",
    PRO_GRID_OPERATE_DELETE_LABEL: "<i class='fa fa-trash-o'></i>删除",
    PRO_MESSAGE_DELETE_CONFIRM: "<i class='fa fa-warning color-warning'></i> 确认删除?",
    PRO_MODAL_UPDATE_TITLE: "<i class='fa fa-edit'></i> 编辑",
    PRO_MODAL_ADD_TITLE: "<i class='fa fa-plus-square'></i> 添加",
    PRO_MODAL_VIEW_TITLE: "<i class='fa fa-file-text-o'></i> 查看"
});