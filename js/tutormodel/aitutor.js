// Setup Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set background to white

// Setup Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(18, 0, 6); // Adjusted to get a better view

// Setup Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Orbit Controls for Interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Load GLTF Model
const loader = new THREE.GLTFLoader();
loader.load(
    '1/scene.gltf',  
    (gltf) => {
        const model = gltf.scene;

        // ✅ Make the model larger
        model.scale.set(9, 8, 12); 

        // ✅ Align the model to the left
        model.position.set(-12, 5, -12); 

        // ✅ Ensure the model looks forward
        model.rotation.y = Math.PI / 3; 

        scene.add(model);
        console.log("Model Loaded Successfully!");
    },
    (xhr) => {
        console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}% completed`);
    },
    (error) => {
        console.error('Error loading the model:', error);
    }
);

// Handle Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

//////////////////////////////////////////////////////////////////////////////

// Check browser support for Web Speech API
if (!("webkitSpeechRecognition" in window)) {
    alert(
      "Your browser does not support speech recognition. Please use Chrome or Edge."
    );
  }
  
  // Initialize speech recognition
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  // Initialize speech synthesis
  const synth = window.speechSynthesis;
  let selectedVoice = null;
  
  // Function to set a female voice
  function setFemaleVoice() {
    const voices = synth.getVoices();
    selectedVoice = voices.find(
      (voice) =>
        voice.name.includes("Female") || voice.name.includes("Google US English")
    );
  
    if (!selectedVoice) {
      selectedVoice = voices[0]; // Fallback to the first available voice
    }
  }
  
  // Load voices (since voices may not be available immediately)
  synth.onvoiceschanged = setFemaleVoice;
  
  // Function to speak with the selected voice
  function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.pitch = 1.2; // Slightly higher pitch for a more natural female voice
    utterance.rate = 0.95; // Slightly slower for better clarity
    synth.speak(utterance);
  }
  
  // DOM elements
  const startBtn = document.getElementById("start-btn");
  const chatBox = document.getElementById("chat-box");
  const statusText = document.getElementById("status");
  
  // Gemini API endpoint and key
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAA8QIKQZvwXPYNfkw1XoCRNKptltrPI88";
  
  // Flag to track if the microphone access has been granted
  let isFirstInteraction = true;
  
  // Event listener for the start button
  startBtn.addEventListener("click", async () => {
    if (isFirstInteraction) {
      const introduction =
        "Hello, I am Lara, your AI Tutor. Welcome to learn English!";
      appendMessage("AI: " + introduction, "ai");
      speakText(introduction);
      isFirstInteraction = false;
    }
  
    startBtn.disabled = true;
    recognition.start();
    statusText.textContent = "Listening...";
  });
  
  // Handle speech recognition results
  recognition.addEventListener("result", async (event) => {
    const transcript = event.results[0][0].transcript;
    appendMessage("You: " + transcript, "user");
    statusText.textContent = "Processing...";
  
    try {
      const response = await getConversationalResponse(transcript);
      appendMessage("AI: " + response, "ai");
      speakText(response);
  
      const correction = await getHumanLikeCorrection(transcript);
      if (correction) {
        appendMessage("AI (Correction): " + correction, "correction");
        speakText(correction);
      }
    } catch (error) {
      appendMessage("AI: Error processing your request. Please try again.", "ai");
    }
  
    startBtn.disabled = false;
    statusText.textContent = "Press the button and speak...";
  });
  
  // Handle errors
  recognition.addEventListener("error", (event) => {
    statusText.textContent = "Error: " + event.error;
    startBtn.disabled = false;
  });
  
  // Append messages to the chat box
  function appendMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.classList.add(sender);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // Function to get a conversational response from Gemini API
  async function getConversationalResponse(input) {
    const prompt = `You're an AI English tutor. Reply in a friendly and casual way, keeping it short—just 1-2 sentences: "${input}".`;
  
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    return data.candidates[0].content.parts[0].text.trim();
  }
  
  // Function to get human-like corrections from Gemini API
  async function getHumanLikeCorrection(input) {
    const prompt = `The user said: "${input}". Correct their English in a friendly and encouraging way in 1-2 sentences. For example:
    - If the user says, "I is going to school," respond: "Almost there! The correct sentence is: 'I am going to school.' Great effort!"
    - If the user says, "She don't like apples," respond: "Good try! The correct sentence is: 'She doesn't like apples.' Keep practicing!"
    Provide only the correction and encouragement.`;
  
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  
    if (correction.toLowerCase() !== input.toLowerCase()) {
      return correction;
    }
    return null;
  }
  



