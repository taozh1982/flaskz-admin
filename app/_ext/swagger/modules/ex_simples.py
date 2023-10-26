api_docs = {
    'api.model_route_ex_simples_add': """
        Add SimpleModel instance.
        ---
        tags:
          - EX-SimpleModel
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
                  example: hello
                field_integer:
                  type: integer
                  description: field_integer
                  required: true
                  example: 1
                field_float:
                  type: number
                  description: field_float
                  required: true
                  example: 1.1
                field_boolean: 
                  type: boolean
                  description: field_boolean
                  required: true
                  example: true
                field_text:
                  type: string
                  description: field_text
                  required: true
                  example: world
                field_datetime:
                  type: string
                  description: field_datetime
                  required: true
                  example: 2023-07-20T18:00
        responses:
          200:
            description: The added SimpleModel instance
            schema:
              properties:
                status:
                  type: string
                  example: success
                data:
                  type: object
                  properties:
                    id:
                      type: integer
                      description: instance id
                      example: 1
                    field_string:
                      type: string
                      description: field_string
                      example: hello
                    field_integer:
                      type: integer
                      description: field_integer
                      example: 1
                    field_float:
                      type: number
                      description: field_float
                      example: 1.1
                    field_boolean:
                      type: boolean
                      description: field_boolean
                      example: true
                    field_text:
                      type: string
                      description: field_text
                      example: world
                    field_datetime:
                      type: string
                      description: field_datetime
                      example: 2023-07-20T18:00
        security:
          - Authorization: [] 
        """,
    'api.model_route_ex_simples_update': """
        Update specified SimpleModel instance.
        ---
        tags:
          - EX-SimpleModel
        parameters:
          - name: did
            in: path
            type: integer
            description: The ID of the instance. <b>*Only works with [PATCH]/api/v1.0/ex-simples/{did}/</b>
            example: 1
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
                  example: 1
                field_integer:
                  type: integer
                  description: field_integer
                  example: 2
        responses:
          200:
            description: Updated instance
            schema:
              properties:
                    id:
                      type: integer
                      description: instance id
                      example: 1
                    field_string:
                      type: string
                      description: field_string
                      example: hello
                    field_integer:
                      type: integer
                      description: field_integer
                      example: 2
                    field_float:
                      type: number
                      description: field_float
                      example: 1.1
                    field_boolean:
                      type: boolean
                      description: field_boolean
                      example: true
                    field_text:
                      type: string
                      description: field_text
                      example: world
                    field_datetime:
                      type: string
                      description: field_datetime
                      example: 2023-07-20T18:00
        security:
          - Authorization: []
        """,
    'api.model_route_ex_simples_query': """
        Query All SimpleModel instances.
        ---
        tags:
          - EX-SimpleModel
        parameters:
          - name: did
            in: path
            type: integer
            description: The ID of the instance. <b>*Only works with [GET]/api/v1.0/ex-simples/{did}/</b>
            example: 1
        responses:
          200:
            description: Query All SimpleModel instances
            schema:
              properties:
                status:
                  type: string
                  example: success
                data:
                  type: array
                  items:
                    type: object
                    properties:
                      id:
                        type: integer
                        description: instance id
                        example: 1
                      field_boolean:
                        type: boolean
                        description: field_boolean
                        example: true
                      field_datetime:
                        type: string
                        description: field_datetime
                        example: 2023-07-20T18:00
                      field_float:
                        type: number
                        description: field_float
                        example: 1.1
                      field_integer:
                        type: integer
                        description: field_integer
                        example: 1
                      field_string:
                        type: string
                        description: field_string
                        example: hello
                      field_text:
                        type: string
                        description: field_text
                        example: world
        security:
          - Authorization: []
        """,
    'api.model_route_ex_simples_delete': """
        Delete specified SimpleModel instance.
        ---
        tags:
          - EX-SimpleModel
        parameters:
          - name: did
            in: path
            type: integer
            required: true
            description: The ID of the instance
            example: 1
        responses:
          200:
            description: Delete specified SimpleModel instance
            schema:
              properties:
                status:
                  type: string
                  example: success
                data:
                  type: object
                  properties:
                    id:
                      type: integer
                      description: instance id
                      example: 1
                    field_string:
                      type: string
                      description: field_string
                      example: hello
                    field_integer:
                      type: integer
                      description: field_integer
                      example: 1
                    field_float:
                      type: number
                      description: field_float
                      example: 1.1
                    field_boolean:
                      type: boolean
                      description: field_boolean
                      example: true
                    field_text:
                      type: string
                      description: field_text
                      example: world
                    field_datetime:
                      type: string
                      description: field_datetime
                      example: 2023-07-20T18:00
        security:
          - Authorization: []
        """
}
