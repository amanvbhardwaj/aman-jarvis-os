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

// Handle send button click (now calls backend)
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // Show user message
  renderMessage('user', text);
  input.value = '';

  try {
    // Call backend on Render
    const response = await fetch('https://aman-jarvis-backend.onrender.com/api/jarvis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    const reply = data.reply || 'Jarvis backend did not send a reply.';

    renderMessage('jarvis', reply);
  } catch (err) {
    renderMessage('jarvis', 'Error talking to backend. Check connection.');
  }
}

// Wire up button
sendButton.addEventListener('click', sendMessage);

// Allow Enter key to send
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
