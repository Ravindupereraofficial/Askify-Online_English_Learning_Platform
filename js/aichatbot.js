const massegemainarray = [];
var md = window.markdownit();

function sendmessege() {
  let usermsg = document.getElementById("gettext").value;
  if (usermsg === "") {
    alert("Please enter a message.");
    return;
  }

  let sender1massege = {
    sender: "sender1",
    message: usermsg,
  };

  massegemainarray.push(sender1massege);
  loadchatbox();
  aigetrespond(usermsg); 
  document.getElementById("gettext").value = "";
}

function loadchatbox() {
  const text = document.getElementById("senders");
  let body = "";
  massegemainarray.forEach((smassege) => {
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
      body += `
        <div class="d-flex flex-row justify-content-start mb-4">
            <img src="img/free-chat-support-icon-1708-thumb.png"
                alt="avatar 1" style="width: 45px; height: 100%;">
            <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
                <p class="small mb-0">${md.render(smassege.message)}</p>
            </div>
        </div>
        `;
    }
  });

  text.innerHTML = body;
}

function aigetrespond(usermsg) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: usermsg,
          },
        ],
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAA8QIKQZvwXPYNfkw1XoCRNKptltrPI88",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log("API Response:", result); 
      if (result.candidates && result.candidates.length > 0) {
        const aiResponse = result.candidates[0].content.parts[0].text;

        const sender2massege = {
          sender: "sender2",
          message: aiResponse,
        };

        massegemainarray.push(sender2massege);
        loadchatbox();
      } else {
        console.error("Unexpected API Response Format:", result);
      }
    })
    .catch((error) => console.error("Error:", error));
}
