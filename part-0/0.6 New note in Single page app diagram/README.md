```mermaid
sequenceDiagram;
participant browser;
participant server;
activate browser;
browser->>server: POST Request https://studies.cs.helsinki.fi/exampleapp/new_note_spa;
Note over browser,server: Javasctript Create The Note Object Push it to Notes Array then Rerender Page After All These It Send It to Server to Save It
deactivate browser;
activate server;
server->>browser: POST Respones 201 Created;
Note over server,browser: Server Does not force browser to reload
deactivate server;
```
