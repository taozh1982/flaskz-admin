/**
 * ajax请求url
 */
var AjaxUrl = {
    sys_roles: {
        query: "/sys-mgmt/roles/",
        add: "/sys-mgmt/roles/",
        delete: "/sys-mgmt/roles/[id]",
        update: "/sys-mgmt/roles/"
    },
    sys_users: {
        query: "/sys-mgmt/users/multi/",
        add: "/sys-mgmt/users/",
        delete: "/sys-mgmt/users/[id]",
        update: "/sys-mgmt/users/"
    },
    sys_licenses: {
        query: "/sys-mgmt/licenses/",
        add: {url: "/sys-mgmt/licenses/", method: "POST"}
    },
    sys_action_logs: {
        query: {url: "/sys-mgmt/action-logs/pss/", method: "POST"},
        modules: "/sys-mgmt/modules/"
    },
    sys_options: {
        query: "/sys-mgmt/sys-options/",
        update: "/sys-mgmt/sys-options/"
    },
    sys_auth: {
        // login: {url: "/sys-mgmt/auth/login/", method: "POST"},
        login: {url: "/sys-mgmt/auth/token/", method: "POST"},
        logout: {url: "/sys-mgmt/auth/logout/", method: "GET"},

        query: "/sys-mgmt/auth/account/",
        update: "/sys-mgmt/auth/account/"
    }
};
z.util.mergeObject(AjaxUrl, {
    ex_simples: {
        query: "/api/v1.0/ex-simples/",
        add: "/api/v1.0/ex-simples/",
        delete: "/api/v1.0/ex-simples/[id]",
        update: "/api/v1.0/ex-simples/",
        download: "/api/v1.0/ex-simples/download/"
    },
    ex_departments: {
        query: "/api/v1.0/ex-departments/",
        add: "/api/v1.0/ex-departments/",
        delete: "/api/v1.0/ex-departments/[id]",
        update: "/api/v1.0/ex-departments/"
    },
    ex_employees: {
        query: {url: "/api/v1.0/ex-employees/pss/", method: "POST"},
        add: "/api/v1.0/ex-employees/",
        delete: "/api/v1.0/ex-employees/[id]",
        bulk_delete: {url: "/api/v1.0/ex-employees/bulk/", method: "DELETE"},
        update: "/api/v1.0/ex-employees/"
    }
})