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