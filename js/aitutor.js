// Check browser support for Web Speech API
if (!('webkitSpeechRecognition' in window)) {
  alert('Your browser does not support speech recognition. Please use Chrome or Edge.');
}

// Initialize speech recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Initialize speech synthesis
const synth = window.speechSynthesis;

// DOM elements
const startBtn = document.getElementById('start-btn');
const chatBox = document.getElementById('chat-box');
const statusText = document.getElementById('status');


  // Gemini API endpoint and key
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=";
  
  // Flag to track if the microphone access has been granted
  let isFirstInteraction = true;
  
  // Event listener for the start button
  startBtn.addEventListener('click', async () => {
    if (isFirstInteraction) {
      // First interaction: Introduce the AI tutor
      const introduction = "Hello, I am Lara, your AI Tutor. Welcome to learn English!";
      appendMessage('AI: ' + introduction, 'ai');
      const utterance = new SpeechSynthesisUtterance(introduction);
      synth.speak(utterance);
  
      // Set the flag to false after the first interaction
      isFirstInteraction = false;
    }
  
    // Disable the button and start listening
    startBtn.disabled = true;
    recognition.start();
    statusText.textContent = 'Listening...';
  });
  
  // Handle speech recognition results
  recognition.addEventListener('result', async (event) => {
    const transcript = event.results[0][0].transcript;
    appendMessage('You: ' + transcript, 'user');
    statusText.textContent = 'Processing...';
  
    try {
      // Get a conversational response from Gemini API
      const response = await getConversationalResponse(transcript);
      appendMessage('AI: ' + response, 'ai');
  
      // Speak the AI's response
      const utterance = new SpeechSynthesisUtterance(response);
      synth.speak(utterance);
  
      // Check for corrections
      const correction = await getHumanLikeCorrection(transcript);
      if (correction) {
        appendMessage('AI (Correction): ' + correction, 'correction');
        const correctionUtterance = new SpeechSynthesisUtterance(correction);
        synth.speak(correctionUtterance);
      }
    } catch (error) {
      appendMessage('AI: Error processing your request. Please try again.', 'ai');
    }
  
    // Re-enable the button after processing
    startBtn.disabled = false;
    statusText.textContent = 'Press the button and speak...';
  });
  
  // Handle errors
  recognition.addEventListener('error', (event) => {
    statusText.textContent = 'Error: ' + event.error;
    startBtn.disabled = false; // Re-enable the button on error
  });
  
  // Append messages to the chat box
  function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add(sender);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // Function to get a conversational response from Gemini API
  async function getConversationalResponse(input) {
    const prompt = `You are an AI English tutor. Respond to the following in a friendly and conversational manner in 1-2 sentences: "${input}".`;
  
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });
  
    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text.trim();
    return aiResponse;
  }
  
  // Function to get human-like corrections from Gemini API
  async function getHumanLikeCorrection(input) {
    const prompt = `The user said: "${input}". Correct their English in a friendly and encouraging way in 1-2 sentences. For example:
    - If the user says, "I is going to school," respond: "Almost there! The correct sentence is: 'I am going to school.' Great effort!"
    - If the user says, "She don't like apples," respond: "Good try! The correct sentence is: 'She doesn't like apples.' Keep practicing!"
    Provide only the correction and encouragement.`;
  
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });
  
    const data = await response.json();
    const correction = data.candidates[0].content.parts[0].text.trim();
  
    // Only return corrections if the input and corrected text are different
    if (correction.toLowerCase() !== input.toLowerCase()) {
      return correction;
    }
    return null;
  }