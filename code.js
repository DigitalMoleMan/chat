var socket = io.connect("213.66.254.63:3074");

var posts = [];

socket.on("post", (data) => {
    posts = data;
    load()
})

function load() {

    function compare(a, b) {
        if (a.date < b.date)
            return -1;
        if (a.date > b.date)
            return 1;
        return 0;
    }

    posts.sort(compare);

    var cards = "";
    posts.forEach(post => {
        cards += '<div id="card" class="card"> <span id="messagePoster" class="posterName">' + post.name + '</span> <span id="messageContent" class="messageContent">' + post.message + '</span> </div>';
    })
    document.getElementById("contentArea").innerHTML = cards;

}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 13) {
        submit(document.getElementById('messageInput').value, document.getElementById('nameInput').value);
    }
})

function submit(message, name) {
    if (!message == "") {
        socket.emit("submit", {
            name: name,
            message: message
        });

        document.getElementById("messageInput").value = "";


        document.getElementById("contentArea").innerHTML = '<div id="card" class="card"> <span id="messagePoster" class="posterName">' + name + '</span> <span id="messageContent" class="messageContent">' + message + '</span> </div>' + document.getElementById("contentArea").innerHTML;
    }
}