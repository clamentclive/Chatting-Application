// =====================================
// GET HTML ELEMENTS
// =====================================

const messageInput = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

const messages = document.getElementById("messages");

const profileName = document.getElementById("profileName");

const logoutBtn = document.getElementById("logoutBtn");

const searchInput = document.getElementById("searchInput");

const users = document.querySelectorAll(".user");

const chatUserName = document.getElementById("chatUserName");

const chatUserImage = document.getElementById("chatUserImage");

const chatStatus = document.getElementById("chatStatus");

const typing = document.getElementById("typing");

const typingName = document.getElementById("typingName");


// =====================================
// GET LOGIN USERNAME
// =====================================

const username = localStorage.getItem("username");

if (username) {

    profileName.textContent = username;

}


// =====================================
// CURRENT CHAT USER
// =====================================

let currentUser = "Alex";


// =====================================
// AUTOMATIC REPLIES
// =====================================

const replies = {

    Alex: [

        "Hey! How are you? 😊",

        "I'm doing great!",

        "What are you doing?",

        "That's really nice!",

        "Haha, that's funny 😂",

        "Tell me more about it.",

        "Sounds good! 👍",

        "Yeah, I agree with you.",

        "Nice! I like that.",

        "What are your plans for today?"

    ],


    John: [

        "Hey! What's up?",

        "I'm good, thanks!",

        "Are you free tomorrow?",

        "Let's catch up sometime.",

        "That sounds great!",

        "Okay, I'll let you know.",

        "Sure! No problem.",

        "See you tomorrow! 👋",

        "That's interesting.",

        "Cool! 👍"

    ],


    Sarah: [

        "Hey! 😊",

        "I'm doing really well!",

        "That's great!",

        "I completely agree.",

        "What happened next?",

        "Wow, that's interesting!",

        "Sounds amazing!",

        "Haha 😂",

        "Sure, let's do it!",

        "Talk to you later!"

    ],


    David: [

        "Good morning! ☀️",

        "Hey, how's everything?",

        "I'm a little busy right now.",

        "I'll message you later.",

        "Sounds good!",

        "Okay 👍",

        "Thanks!",

        "Have a great day!",

        "See you soon!",

        "Take care!"

    ]

};


// =====================================
// SMART REPLY
// =====================================

function getReply(message) {

    const text = message.toLowerCase();


    // Hello

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return "Hey! Nice to hear from you 😊";

    }


    // How are you

    if (
        text.includes("how are you")
    ) {

        return "I'm doing great! How about you? 😊";

    }


    // Good morning

    if (
        text.includes("good morning")
    ) {

        return "Good morning! ☀️ Hope you have a great day!";

    }


    // Good night

    if (
        text.includes("good night")
    ) {

        return "Good night! Sleep well 😴";

    }


    // Thank you

    if (
        text.includes("thank")
    ) {

        return "You're welcome! 😊";

    }


    // Bye

    if (
        text.includes("bye")
    ) {

        return "Bye! Talk to you later 👋";

    }


    // What are you doing

    if (
        text.includes("what are you doing")
    ) {

        return "I'm just relaxing and chatting with you 😄";

    }


    // Random reply

    const userReplies = replies[currentUser];

    const randomIndex =
        Math.floor(
            Math.random() * userReplies. length
        );

    return userReplies[randomIndex];

}


// =====================================
// GET CURRENT TIME
// =====================================

function getTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

}


// =====================================
// ADD MESSAGE
// =====================================

function addMessage(text, type) {

    const messageDiv =
        document.createElement("div");


    messageDiv.classList.add(
        "message",
        type
    );


    messageDiv.innerHTML = `

        <div class="message-content">

            <p>${text}</p>

            <span>
                ${getTime()}
            </span>

        </div>

    `;


    messages.appendChild(messageDiv);


    // Scroll to bottom

    messages.scrollTop =
        messages.scrollHeight;

}


// =====================================
// SEND MESSAGE
// =====================================

function sendMessage() {

    const message =
        messageInput.value.trim();


    // Don't send empty message

    if (message === "") {

        return;

    }


    // Add user's message

    addMessage(
        message,
        "sent"
    );


    // Clear input

    messageInput.value = "";


    // Show typing animation

    showTyping();


    // Random reply delay

    const delay =
        Math.floor(
            Math.random() * 1500
        ) + 1000;


    setTimeout(
        function() {

            // Hide typing

            hideTyping();


            // Get automatic reply

            const reply =
                getReply(message);


            // Add reply

            addMessage(
                reply,
                "received"
            );

        },
        delay
    );

}


// =====================================
// SEND BUTTON
// =====================================

sendBtn.addEventListener(
    "click",
    sendMessage
);


// =====================================
// ENTER KEY
// =====================================

messageInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            sendMessage();

        }

    }
);


// =====================================
// SHOW TYPING
// =====================================

function showTyping() {

    typing.style.display =
        "flex";


    typingName.textContent =
        currentUser +
        " is typing...";


    messages.scrollTop =
        messages.scrollHeight;

}


// =====================================
// HIDE TYPING
// =====================================

function hideTyping() {

    typing.style.display =
        "none";

}


// =====================================
// USER SELECTION
// =====================================

users.forEach(
    function(user) {

        user.addEventListener(
            "click",
            function() {


                // Remove active
                // from all users

                users.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                // Add active
                // to selected user

                user.classList.add(
                    "active"
                );


                // Get user information

                currentUser =
                    user.dataset.name;


                const initial =
                    user.dataset.initial;


                const status =
                    user.dataset.status;


                // Change chat header

                chatUserName.textContent =
                    currentUser;


                chatUserImage.textContent =
                    initial;


                // Change online/offline status

                if (
                    status === "Online"
                ) {

                    chatStatus.textContent =
                        "● Online";


                    chatStatus.classList.remove(
                        "offline-text"
                    );

                }

                else {

                    chatStatus.textContent =
                        "● Offline";


                    chatStatus.classList.add(
                        "offline-text"
                    );

                }


                // Clear old messages

                messages.innerHTML = "";


                // Add welcome message

                addMessage(

                    "Hey! This is " +
                    currentUser +
                    ". How can I help you? 😊",

                    "received"

                );


                // Focus input

                messageInput.focus();

            }
        );

    }
);


// =====================================
// SEARCH USERS
// =====================================

searchInput.addEventListener(
    "input",
    function() {

        const searchText =
            searchInput.value
            .toLowerCase();


        users.forEach(
            function(user) {

                const name =
                    user.dataset.name
                    .toLowerCase();


                if (
                    name.includes(searchText)
                ) {

                    user.style.display =
                        "flex";

                }

                else {

                    user.style.display =
                        "none";

                }

            }
        );

    }
);


// =====================================
// LOGOUT
// =====================================

logoutBtn.addEventListener(
    "click",
    function() {

        // Remove username

        localStorage.removeItem(
            "username"
        );


        // Go back to login page

        window.location.href =
            "login.html";

    }
);


// =====================================
// INITIAL SCROLL
// =====================================

messages.scrollTop =
    messages.scrollHeight;