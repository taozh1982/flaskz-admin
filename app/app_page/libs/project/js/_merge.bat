@echo off
if not exist ..\proj.js goto :CONTINUE
    del ..\proj.js
:CONTINUE
for /f "delims=" %%G in (.\_proj.txt) do (
    type "%%G" >> ..\proj.js
    echo. >> ..\proj.js
)