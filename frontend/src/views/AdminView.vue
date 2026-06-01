<template>
  <div class="admin-container container">
    <div class="admin-header">
      <h1>Admin Dashboard</h1>
      <p>Manage products, orders, and view AI interaction logs.</p>
    </div>
    
    <div class="dashboard-grid">
      <div class="stat-card">
        <h3>Total Orders</h3>
        <div class="value">128</div>
      </div>
      <div class="stat-card">
        <h3>Active Promos</h3>
        <div class="value">2</div>
      </div>
      <div class="stat-card">
        <h3>AI Chats</h3>
        <div class="value">1,024</div>
      </div>
    </div>
    
    <div class="data-table-container">
      <h2>Recent Orders</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A1B2C3</td>
            <td>Maksim Developer</td>
            <td>2,000 ₽</td>
            <td><span class="status paid">Paid</span></td>
            <td><button class="link-btn">View</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  padding: 80px 20px;
}

.admin-header {
  margin-bottom: 48px;
}

.admin-header h1 {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 8px;
}

.admin-header p {
  color: var(--text-secondary);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.stat-card {
  background: var(--surface-color);
  padding: 24px;
  border-radius: var(--radius-md);
}

.stat-card h3 {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 12px;
}

.value {
  font-size: 32px;
  font-weight: 600;
}

.data-table-container {
  background: var(--surface-color);
  padding: 32px;
  border-radius: var(--radius-md);
}

.data-table-container h2 {
  font-size: 20px;
  margin-bottom: 24px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th {
  padding: 12px 16px;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 14px;
  border-bottom: 1px solid var(--border-color);
}

.data-table td {
  padding: 16px;
  font-size: 15px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
}

.status {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
}

.status.paid {
  background: rgba(52, 199, 89, 0.1);
  color: #34c759;
}

.link-btn {
  color: #007aff;
  font-size: 14px;
}

.link-btn:hover {
  text-decoration: underline;
}
</style>
