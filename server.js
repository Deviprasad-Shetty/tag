const express = require('express');
const cron = require('node-cron');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Mock database
let orders = {
        id: "BK12345",
        total: 49.99,
        status: 'pending',
        items: [
          {
            item_id: "1001",
            item_name: "Atomic Habits",
            price: 24.99,
            item_brand: "Rakuta",
            item_category: "Books",
            item_variant: "English Literature",
            quantity: 1
          },
          {
            item_id: "1002",
            item_name: "Deep Work",
            price: 19.99,
            item_brand: "Rakuta",
            item_category: "Books",
            item_variant: "English Literature",
            quantity: 1
          }
        ]
      };

// Scheduled job (every 10 minutes)
cron.schedule('*/10 * * * *', async () => {
  console.log("[CRON JOB] Checking for pending orders...");

  const pendingOrders = orders.filter(order => order.status === 'pending');

  if (pendingOrders.length === 0) {
    console.log("No pending orders found.");
    return;
  }

  // Send each order to the external API
  for (const order of pendingOrders) {
    try {
      const response = await axios.post('https://trackingservice-588527070456.us-west1.run.app', order,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // Optionally add auth headers
            // 'Authorization': 'Bearer YOUR_TOKEN'
          }
        }
      );
      console.log(`Order ${order.id} processed:`, response.data);
      order.status = 'completed';
    } catch (error) {
      console.error(`Failed to process order ${order.id}:`, error.message);
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});