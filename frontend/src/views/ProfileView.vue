<template>
  <div class="profile-container container">
    <div class="profile-sidebar">
      <h2>Profile</h2>
      <ul class="nav-list">
        <li class="active">Account Details</li>
        <li>Order History</li>
        <li>Settings</li>
        <li class="danger">Sign Out</li>
      </ul>
    </div>
    
    <div class="profile-content">
      <div class="content-section">
        <h1>Account Details</h1>
        <form class="auth-form" @submit.prevent>
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" value="Maksim Developer" />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" value="+7 (999) 000-00-00" />
          </div>
          <button class="btn btn-primary mt-4">Save Changes</button>
        </form>
      </div>
      
      <div class="content-section mt-8">
        <h2>Recent Orders</h2>
        <div class="order-list">
          <div class="order-card">
            <div class="order-header">
              <span class="order-id">Order #A1B2C3</span>
              <span class="status completed">Completed</span>
            </div>
            <div class="order-body">
              <p>2 items • 2,000 ₽</p>
              <p class="date">May 15, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 80px 20px;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 60px;
}

@media (max-width: 768px) {
  .profile-container {
    grid-template-columns: 1fr;
  }
}

.profile-sidebar h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-list li {
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.nav-list li:hover {
  background: var(--surface-color);
  color: var(--text-color);
}

.nav-list li.active {
  background: var(--surface-color);
  color: var(--text-color);
  font-weight: 500;
}

.nav-list li.danger {
  color: #ff3b30;
  margin-top: 24px;
}

.profile-content h1 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 32px;
}

.content-section h2 {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
}

.auth-form {
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  color: var(--text-secondary);
}

.form-group input {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 15px;
}

.mt-4 { margin-top: 16px; }
.mt-8 { margin-top: 64px; }

.order-card {
  background: var(--surface-color);
  border-radius: var(--radius-md);
  padding: 24px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.order-id {
  font-weight: 600;
}

.status {
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(52, 199, 89, 0.1);
  color: #34c759;
}

.order-body {
  color: var(--text-secondary);
  font-size: 14px;
}
</style>
