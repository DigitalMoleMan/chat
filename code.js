var socket = io.connect("213.66.254.63:3074");

var posts = [];

socket.on("post", (data) => {
    posts = data;
    load()
})

var ping = new Audio();
    ping.src = "sounds/ping.mp3";

function load() {

    function compare(a, b) {
        if (a.date < b.date)
            return -1;
        if (a.date > b.date)
            return 1;
        return 0;
    }

    posts.sort(compare);

    posts.forEach(post => {
        post.message = post.message.split(" ");
        post.message.forEach((msg, i) => {
            if(msg.substr(msg.length-4, msg.length-1) == ".png") post.message[i] = "<img class='image-attachment' src='" + post.message[i] + "'>";

        })
        post.message = post.message.join(" ");
    })

    var cards = "";
    posts.forEach(post => {
        cards += '<div id="card" class="card"> <span id="messagePoster" class="posterName">' + post.name + '</span> <span id="messageContent" class="messageContent">' + post.message + '</span> </div>';
    })
    document.getElementById("contentArea").innerHTML = cards;

    var objDiv = document.getElementById("contentArea");
    objDiv.scrollTop = objDiv.scrollHeight;

}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 13) {
        submit(document.getElementById('messageInput').value, document.getElementById('nameInput').value);
    }
})

socket.on("message", message => {

    message.message = message.message.split(" ");
    message.message.forEach(msg => {
        if(msg.substr(msg.length-4, msg.length-1) == ".png") message.message[i] = "<img class='image-attachment' src='" + message.message[i] + "'>";
    })  
    message.message = message.message.join(" ");

    document.getElementById("contentArea").innerHTML += '<div id="card" class="card"> <span id="messagePoster" class="posterName">' + message.name + '</span> <span id="messageContent" class="messageContent">' + message.message + '</span> </div>';

    var objDiv = document.getElementById("contentArea");
    objDiv.scrollTop = objDiv.scrollHeight;

    ping.play();


})

function submit(message, name) {
    if (!message == "") {

        var err = "";
        if(message.trim() == "" || name.trim() == "") err = "Ops, no message or name."
        if(err != "") {
            alert(err);
            return;
        }


        socket.emit("submit", {
            name: name,
            message: message
        });


        document.getElementById("messageInput").value = "";

        //document.getElementById("contentArea").innerHTML = '<div id="card" class="card"> <span id="messagePoster" class="posterName">' + name + '</span> <span id="messageContent" class="messageContent">' + message + '</span> </div>' + document.getElementById("contentArea").innerHTML;
    }
}