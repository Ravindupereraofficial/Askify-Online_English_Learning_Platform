let findsender = "";
const massegemainarray = [];

var md = window.markdownit();

// Show the preloader for a fixed duration
window.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content");
  
    // Set loader duration (e.g., 3 seconds)
    setTimeout(function () {
      preloader.style.display = "none"; // Hide preloader
      content.style.display = "block"; // Show main content
    }, 5000); // Duration in milliseconds
  });
  
  





function selectsender(sender) {
    findsender = sender;
}

function sendmessege() {
    if (findsender === "") {
        alert("Please select Sender First");
        return;
    }

    let usermsg = document.getElementById("gettext").value;
    if (usermsg === "") {
        alert("Please enter a message.");
        return;
    }

    if (findsender === "sender 1") {
        let sender1massege = {
            sender: "sender1",
            message: usermsg
        };

        massegemainarray.push(sender1massege);
    } else {
        let sender2massege = {
            sender: "sender2",
            message: usermsg
        };

        massegemainarray.push(sender2massege);
    }

    loadchatbox();
    aigetrespond();
    document.getElementById("gettext").value = "";
}

function loadchatbox() {
    const text = document.getElementById("senders");
    let body = "";
    massegemainarray.forEach(smassege => {
        if (smassege.sender === "sender1") {
            body += `
            <div class="d-flex flex-row justify-content-end mb-4">
                <div class="p-3 me-3 border bg-body-tertiary" style="border-radius: 15px;">
                    <p class="small mb-0">${md.render(smassege.message)}</p>
                </div>
                <img src="img/user.png"
                    alt="avatar 2" style="width: 45px; height: 100%;">
            </div>
            `;
        } else if (smassege.sender === "sender2") {
            body +=  `
            <div class="d-flex flex-row justify-content-start mb-4">
                <img src="img/free-chat-support-icon-1708-thumb.png"
                    alt="avatar 1" style="width: 45px; height: 100%;">
                <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
                    <p class="small mb-0">${md.render(smassege.message)}</p>
                </div>
            </div>
            `
            ;
        }
    });

    text.innerHTML = body;
}

function aigetrespond() {
    let usermsg = document.getElementById("gettext").value;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": usermsg
                    }
                ]
            }
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAA8QIKQZvwXPYNfkw1XoCRNKptltrPI88", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const aiResponse = result.candidates[0].content.parts[0].text;

           
            const sender2massege = {
                sender: "sender2",
                message: aiResponse
            };

            massegemainarray.push(sender2massege);

            
            loadchatbox();
        })
        .catch((error) => console.error("Error:", error));
}
let names=[
    {
        name: "saman"
    }
]
