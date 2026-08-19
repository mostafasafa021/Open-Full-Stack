sequenceDiagram
participant browser
participant server
activate browser
browser->>server: POST Request https://studies.cs.helsinki.fi/exampleapp/new_note
deactivate browser
activate server
server->>browser: POST Respones 301 Redirect
Note over server,browser: Server Force Browser to redirect to location header
deactivate server
activate browser
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
deactivate browser
activate server
server->>browser: Send Notes HTML Document
deactivate server
activate browser
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
deactivate browser
activate server
server->>browser: Send Notes CSS File
deactivate server
activate browser
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
deactivate browser
activate server
server->>browser: Send Javascript File
Note over server,browser: Javascript Start Exection and fetch notes and render notes to page
deactivate server
activate browser
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
deactivate browser
activate server
server->>browser: Send Data.json
deactivate server
