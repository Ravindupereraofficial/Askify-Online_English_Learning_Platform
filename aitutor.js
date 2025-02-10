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
  
  // Event listener for the start button
  startBtn.addEventListener('click', () => {
    recognition.start();
    statusText.textContent = 'Listening...';
  });
  
  // Handle speech recognition results
  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    appendMessage('You: ' + transcript, 'user');
    statusText.textContent = 'Processing...';
  
    // Send transcript to AI for response (mock function for now)
    const aiResponse = getAIResponse(transcript);
    appendMessage('AI: ' + aiResponse, 'ai');
  
    // Speak the AI response
    const utterance = new SpeechSynthesisUtterance(aiResponse);
    synth.speak(utterance);
    statusText.textContent = 'Press the button and speak...';
  });
  
  // Handle errors
  recognition.addEventListener('error', (event) => {
    statusText.textContent = 'Error: ' + event.error;
  });
  
  // Append messages to the chat box
  function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add(sender);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // Mock AI response function (replace with actual AI API call)
  function getAIResponse(input) {
    // Replace this with an API call to OpenAI or another AI service
    const responses = [
      "Great job! Your pronunciation is improving.",
      "Can you try saying that again?",
      "Let's practice some more vocabulary.",
      "Your sentence structure is correct!",
      "That was a good attempt. Let's try another sentence.",
      "I understood what you said. Keep practicing!",
      "You're doing well! Let's move on to the next exercise."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }