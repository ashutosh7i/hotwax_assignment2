const axios = require('axios');
const baseURL = 'http://localhost:5000';

// Test scenarios
const testScenarios = async () => {
    try {
        // Auth Tests
        // console.log("\n0. Register and Login Tests:");
        const registerData = {
            username: "testuser",
            password: "testpass123"
        };
        // const registerResponse = await axios.post(`${baseURL}/auth/register`, registerData);
        // console.log("Registration successful:", registerResponse.data);

        const loginResponse = await axios.post(`${baseURL}/auth/login`, registerData);
        console.log("Login successful:", loginResponse.data);

        // Set token for subsequent requests
        const token = loginResponse.data.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        // Scenario 1: Create Order
        const createOrderData = {
            order_date: new Date().toISOString().split('T')[0],
            customer_id: 1,
            shipping_contact_mech_id: 1,
            billing_contact_mech_id: 2,
            order_items: [
                {
                    product_id: 1,
                    quantity: 2,
                    status: "CREATED"
                },
                {
                    product_id: 2,
                    quantity: 1,
                    status: "CREATED"
                }
            ]
        };
        
        console.log("\n1. Creating Order:");
        const createResponse = await axios.post(`${baseURL}/orders`, createOrderData, config);
        const orderId = createResponse.data.orderId;
        console.log("Order created:", createResponse.data);

        // Scenario 2: Retrieve Order
        console.log("\n2. Retrieving Order:");
        const getResponse = await axios.get(`${baseURL}/orders/${orderId}`, config);
        console.log("Order details:", getResponse.data);

        // Scenario 3: Update Order Item
        const updateItemData = {
            quantity: 2,
            status: "UPDATED"
        };
        console.log("\n3. Updating Order Item:");
        const updateItemResponse = await axios.put(`${baseURL}/orders/${orderId}/items/2`, updateItemData, config);
        console.log("Item updated:", updateItemResponse.data);

        // Scenario 4: Add Order Item
        const addItemData = {
            product_id: 3,
            quantity: 1,
            status: "CREATED"
        };
        console.log("\n4. Adding New Item:");
        const addItemResponse = await axios.post(`${baseURL}/orders/${orderId}/items`, addItemData, config);
        console.log("Item added:", addItemResponse.data);

        // Scenario 5: Delete Order Item
        console.log("\n5. Deleting Order Item:");
        const deleteItemResponse = await axios.delete(`${baseURL}/orders/${orderId}/items/1`, config);
        console.log("Item deleted:", deleteItemResponse.data);

        // Scenario 6: Delete Order
        console.log("\n6. Deleting Order:");
        const deleteOrderResponse = await axios.delete(`${baseURL}/orders/${orderId}`, config);
        console.log("Order deleted:", deleteOrderResponse.data);

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }
};

// Run tests
testScenarios();