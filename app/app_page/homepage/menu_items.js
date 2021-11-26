var MenuItems = [
    {
        name: "设备管理", font_icon: "<i class='fa fa-server'></i>",
        children: [
            {name: "设备列表", url: "device", descriptor: "设备列表"},
            // {name: "设备安全域", url: "zone", descriptor: "设备安全域管理"},
            {name: "登录模板", url: "auth_group", descriptor: "登录模板管理"}
        ]
    },
    {
        name: "网络安全服务", font_icon: "<i class='fa fa-ioxhost'></i>",
        children: [
            {name: "地址对象", url: "network_object", descriptor: "地址对象管理"},
            {name: "地址对象组", url: "network_group", descriptor: "地址对象组管理"},
            {name: "服务对象", descriptor: "服务对象管理"},
            {name: "服务对象组", url: "service_group", descriptor: "服务对象组管理"},
            {name: "安全策略管理", url: "acl", descriptor: "安全策略管理"}
        ]
    },
    {
        name: "负载均衡服务", font_icon: "<i class='fa fa-cubes'></i>",
        children: [
            {name: "服务器节点", url: "f5_node", descriptor: "服务器节点管理"},
            {name: "服务器资源池", url: "f5_pool", descriptor: "服务器资源池管理"},
            {name: "虚拟服务器",url:"f5_virtual_server", descriptor: "虚拟服务器管理"}
            // {name: "Health Monitor管理"}
        ]
    },
    {
        name: "用户管理", font_icon: "<i class='fa fa-user'></i>",
        children: [
            {name: "用户列表", url: "user", descriptor: "用户列表"},
            {name: "角色管理", url: "role", descriptor: "角色管理"}
        ]
    }
];