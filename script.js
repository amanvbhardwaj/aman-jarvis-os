// Get elements
const chat = document.getElementById('chat');
const input = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Render a message in the chat
function renderMessage(role, text) {
  const msg = document.createElement('div');
  msg.className = role === 'user' ? 'message user' : 'message jarvis';
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// Handle send button click
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // Show user message
  renderMessage('user', text);
  input.value = '';

  // Jarvis placeholder reply (no AI yet)
  const reply = 'Jarvis v0 here. Next step: connect me to Gemini and your automations.';
  renderMessage('jarvis', reply);
}

// Wire up button
sendButton.addEventListener('click', sendMessage);

// Allow Enter key to send
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
