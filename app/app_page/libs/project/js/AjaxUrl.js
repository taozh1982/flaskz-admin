/**
 * ajax请求url
 */
var AjaxUrl = {
    for_test: {
        query: "/api/v1.0/templates/",
        add: "/api/v1.0/templates/",
        delete: "/api/v1.0/templates/[id]",
        update: "/api/v1.0/templates/"
    },

    sys_role: {
        query: "/sys-mgmt/roles/",
        add: "/sys-mgmt/roles/",
        delete: "/sys-mgmt/roles/[id]",
        update: "/sys-mgmt/roles/"
    },
    sys_user: {
        query: "/sys-mgmt/users/multi/",
        add: "/sys-mgmt/users/",
        delete: "/sys-mgmt/users/[id]",
        update: "/sys-mgmt/users/"
    },
    sys_license: {
        query: "/sys-mgmt/licenses/",
        add: {url: "/sys-mgmt/licenses/", method: "POST"}
    },
    sys_action_log: {
        query: {url: "/sys-mgmt/action-logs/pss/", method: "POST"},
        modules: "/sys-mgmt/modules/"
    },
    sys_auth: {
        login: {url: "/sys-mgmt/auth/login/", method: "POST"},
        // login: {url: "/sys-mgmt/auth/token/", method: "POST"},
        logout: {url: "/sys-mgmt/auth/logout/", method: "GET"},

        query: "/sys-mgmt/auth/account/",
        update: "/sys-mgmt/auth/account/"
    }
};
