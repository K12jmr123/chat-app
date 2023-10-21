const socket = io();

        socket.on("connect", ()=>{
            console.log("connected");
        });
        
        socket.on("chat message", (message)=>{

            const span = document.createElement("p");
            span.textContent = message;

            document.querySelector("#messages").appendChild(span);
        });

        document.querySelector("#send").addEventListener("click", ()=>{
            const msg = document.querySelector("#message").value;

            
            socket.emit("chat message", msg);
        });