api_docs = {
    'api.model_route_ex_simples_add': """
    Add ex_simple.
    ---
    tags:
      - EX_SIMPLE
    parameters:
      - name: body
        in: body
        required: true
        schema:
          required:
            - name
          properties:
            field_string:
              type: string
              description: field_string
              required: true
            field_int:
              type: integer
              description: field_int
              required: true
            field_float:
              type: number
              description: field_float
              required: true
            field_boolean: 
              type: boolean
              description: field_boolean
              required: true
            field_text:
              type: string
              description: field_text
              required: true
            field_datetime:
              type: string
              description: field_datetime
              required: true
    responses:
      200:
        description: Add ex_simple
        schema:
          properties:
            status:
              type: string
              example: success
            data:
              type: object
              properties:
                field_string:
                  type: string
                  description: field_string
                field_int:
                  type: integer
                  description: field_int
                field_float:
                  type: number
                  description: field_float
                field_boolean:
                  type: boolean
                  description: field_boolean
                field_text:
                  type: string
                  description: field_text
                field_datetime:
                  type: string
                  description: field_datetime 
    security:
      - Authorization: [] 
    """,
    'api.model_route_ex_simples_update': """
    Update ex_simple.
    ---
    tags:
      - EX_SIMPLE
    parameters:
      - name: body
        in: body
        required: true
        schema:
          required:
            - id
          properties:
            id:
              type: integer
              description: id
              required: true
            field_integer:
              type: integer
              description: field_integer
    responses:
      200:
        description: Update ex_simple
        schema:
          properties:
            status:
              type: string
              example: success
            data:
              type: object
              properties:
                field_string:
                  type: string
                  description: field_string
                field_int:
                  type: integer
                  description: field_int
                field_float:
                  type: number
                  description: field_float
                field_boolean:
                  type: boolean
                  description: field_boolean
                field_text:
                  type: string
                  description: field_text
                field_datetime:
                  type: string
                  description: field_datetime
    security:
      - Authorization: []
    """,
    'api.model_route_ex_simples_query': """
    Query ex_simple list.
    ---
    tags:
      - EX_SIMPLE
    responses:
      200:
        description: Query ex_simple list
        schema:
          properties:
            status:
              type: string
              example: success
            data:
              type: array
              items:
                field_boolean:
                  type: boolean
                  description: field_boolean
                field_datetime:
                  type: string
                  description: field_datetime
                field_float:
                  type: number
                  description: field_float
                field_int:
                  type: integer
                  description: field_int
                field_string:
                  type: string
                  description: field_string
                field_text:
                  type: string
                  description: field_text
    security:
      - Authorization: []
    """,
    'api.model_route_ex_simples_delete': """
    Delete ex_simple.
    ---
    tags:
      - EX_SIMPLE
    parameters:
      - name: did
        in: path
        type: integer
        required: true
        description: The ID of the example
    responses:
      200:
        description: Delete ex_simple
        schema:
          properties:
            status:
              type: string
              example: success
            data:
              type: object
              properties:
                field_string:
                  type: string
                  description: field_string
                field_int:
                  type: integer
                  description: field_int
                field_float:
                  type: number
                  description: field_float
                field_boolean:
                  type: boolean
                  description: field_boolean
                field_text:
                  type: string
                  description: field_text
                field_datetime:
                  type: string
                  description: field_datetime
    security:
      - Authorization: []
    """,
    'sys_mgmt.sys_auth_get_token': """
    Get token.
    ---
    tags:
      - SYS_MGMT
    parameters:
      - name: body
        in: body
        required: true
        schema:
          required:
            - username
            - password
          properties:
            username:
              type: string
              description: username
              required: true
            password:
              type: string
              description: password
              required: true
    responses:
      200:
        description: Get token
        schema:
          properties:
            status:
              type: string
              example: success
            data:
              type: object
              properties:
                token:
                  type: string
                  description: token
    """,
    'sys_mgmt.sys_license_upload': """
    Upload license.
    ---
    tags:
      - SYS_MGMT
    parameters:
      - name: file
        in: formData
        required: true
        type: file
        description: The file to upload
    responses:
      200:
        description: Upload license
        schema:
          properties:
            status:
              type: string
              example: success
            data:
              type: object
              properties:
                license:
                  type: string
                  description: license
                license_hash:
                  type: string
                  description: license_hash   
    """
}