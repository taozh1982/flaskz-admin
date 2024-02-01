yang_path = {
    'url': '/restconf/data',
    'method': "patch"
}
device_auth = {
    'add': {
        'url': '/restconf/data/tailf-ncs:devices/authgroups/',
        'method': 'post'
    },
    'update': {
        'url': '/restconf/data/tailf-ncs:devices/authgroups/group={name}',
        'method': 'patch'
    },
    'delete': {
        'url': '/restconf/data/tailf-ncs:devices/authgroups/group={name}',
        'method': 'delete'
    }
}

device = {
    'add': {
        'url': '/restconf/data/tailf-ncs:devices/',
        'method': 'post'
    },
    'update': {
        'url': '/restconf/data/tailf-ncs:devices/device={name}',
        'method': 'patch'
    },
    'delete': {
        'url': '/restconf/data/tailf-ncs:devices/device={name}',
        'method': 'delete'
    },
    'sync': {
        'url': '/restconf/operations/devices/device={name}/sync-from/',
        'method': 'post'
    },
    'fetch': {
        'url': '/restconf/operations/tailf-ncs:devices/device={name}/ssh/fetch-host-keys',
        'method': 'post'
    }
}

# -------------------------------------------示例-------------------------------------------
# sr_segment_list = {
#     'add': {
#         'url': '/restconf/data/srte:sr-lists/',
#         'method': 'post'
#     },
#     'update': {
#         'url': '/restconf/data/srte:sr-lists/sr-list={name},{device_name}',
#         'method': 'put'
#     },
#     'delete': {
#         'url': '/restconf/data/srte:sr-lists/sr-list={name},{device_name}',
#         'method': 'delete'
#     }
# }
