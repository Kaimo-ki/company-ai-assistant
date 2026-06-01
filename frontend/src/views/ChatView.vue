<template>
  <div class="chat-container container">
    <div class="chat-window">
      <div class="chat-header">
        <h2>AI Assistant</h2>
        <p>Ask for color recommendations or repair tips.</p>
      </div>
      
      <div class="messages">
        <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
          <div class="bubble">
            {{ msg.content }}
          </div>
        </div>
      </div>
      
      <div class="chat-input">
        <button class="icon-btn attachment-btn" title="Upload Photo">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </button>
        <input v-model="inputText" @keyup.enter="sendMessage" type="text" placeholder="Type a message..." />
        <button @click="sendMessage" class="btn btn-primary send-btn" :disabled="!inputText.trim()">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([
  { role: 'assistant', content: 'Hello! I am your AI Paint Assistant. I can help you find the perfect color or give advice on your repair. Do you have a photo of your room or a specific color in mind?' }
]);
const inputText = ref('');

const sendMessage = () => {
  if (!inputText.value.trim()) return;
  
  messages.value.push({ role: 'user', content: inputText.value });
  const userMessage = inputText.value;
  inputText.value = '';
  
  // Mock response
  setTimeout(() => {
    messages.value.push({ 
      role: 'assistant', 
      content: `I'm analyzing your request regarding "${userMessage}". Since my backend AI is currently mocked, I recommend checking out our "Морская волна" color for a deep, calming effect!` 
    });
  }, 1000);
};
</script>

<style scoped>
.chat-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  height: calc(100vh - 60px);
}

.chat-window {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  background-color: var(--surface-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.chat-header {
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
}

.chat-header h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.chat-header p {
  color: var(--text-secondary);
  font-size: 14px;
}

.messages {
  flex-grow: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 15px;
  line-height: 1.4;
}

.user .bubble {
  background-color: var(--accent-color);
  color: var(--bg-color);
  border-bottom-right-radius: 4px;
}

.assistant .bubble {
  background-color: var(--bg-color);
  color: var(--text-color);
  border-bottom-left-radius: 4px;
  box-shadow: var(--shadow-sm);
}

.chat-input {
  padding: 16px 24px;
  display: flex;
  gap: 12px;
  align-items: center;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-color);
}

.attachment-btn {
  color: var(--text-secondary);
}

.chat-input input {
  flex-grow: 1;
  padding: 12px 16px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background-color: var(--surface-color);
  color: var(--text-color);
  font-family: inherit;
  font-size: 15px;
  outline: none;
  transition: border-color var(--transition-fast);
}

.chat-input input:focus {
  border-color: var(--text-secondary);
}

.send-btn {
  padding: 10px 20px;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
