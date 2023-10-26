api_docs = {
    'sys_mgmt.sys_auth_get_token': """
        Get auth token.
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
                  example: admin
                password:
                  type: string
                  description: password
                  required: true
                  example: admin
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
                      example: eyJhbGciO...jGqykZwkYxubA
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
