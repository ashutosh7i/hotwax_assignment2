
const { pool,testConnection} = require("../dbConnection");

const orderController = {
    // Create new order
    createOrder: async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { order_date, customer_id, shipping_contact_mech_id, billing_contact_mech_id, order_items } = req.body;

            // Start transaction
            await connection.beginTransaction();

            // Insert order header
            const [orderResult] = await connection.query(
                'INSERT INTO Order_Header (order_date, customer_id, shipping_contact_mech_id, billing_contact_mech_id) VALUES (?, ?, ?, ?)',
                [order_date, customer_id, shipping_contact_mech_id, billing_contact_mech_id]
            );

            // Insert order items
            for (const item of order_items) {
                await connection.query(
                    'INSERT INTO Order_Item (order_id, product_id, quantity, status) VALUES (?, ?, ?, ?)',
                    [orderResult.insertId, item.product_id, item.quantity, item.status]
                );
            }

            await connection.commit();
            connection.release();

            res.status(201).json({ message: "Order created successfully", orderId: orderResult.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get single order
    getOrder: async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const [orderDetails] = await connection.query(
                `SELECT oh.*, oi.*, c.*, cm.*
                FROM Order_Header oh
                JOIN Customer c ON oh.customer_id = c.customer_id
                JOIN Contact_Mech cm ON oh.shipping_contact_mech_id = cm.contact_mech_id
                LEFT JOIN Order_Item oi ON oh.order_id = oi.order_id
                WHERE oh.order_id = ?`,
                [req.params.orderId]
            );
            connection.release();
            res.json(orderDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update order
    updateOrder: async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { shipping_contact_mech_id, billing_contact_mech_id } = req.body;
            
            await connection.query(
                'UPDATE Order_Header SET shipping_contact_mech_id = ?, billing_contact_mech_id = ? WHERE order_id = ?',
                [shipping_contact_mech_id, billing_contact_mech_id, req.params.orderId]
            );
            connection.release();
            res.json({ message: "Order updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete order
    deleteOrder: async (req, res) => {
        try {
            const connection = await pool.getConnection();
            await connection.beginTransaction();

            // Delete order items first
            await connection.query('DELETE FROM Order_Item WHERE order_id = ?', [req.params.orderId]);
            // Delete order header
            await connection.query('DELETE FROM Order_Header WHERE order_id = ?', [req.params.orderId]);

            await connection.commit();
            connection.release();
            res.json({ message: "Order deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Add order item
    addOrderItem: async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { product_id, quantity, status } = req.body;
            
            await connection.query(
                'INSERT INTO Order_Item (order_id, product_id, quantity, status) VALUES (?, ?, ?, ?)',
                [req.params.orderId, product_id, quantity, status]
            );
            connection.release();
            res.status(201).json({ message: "Order item added successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update order item
    updateOrderItem: async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { quantity, status } = req.body;
            
            await connection.query(
                'UPDATE Order_Item SET quantity = ?, status = ? WHERE order_id = ? AND order_item_seq_id = ?',
                [quantity, status, req.params.orderId, req.params.itemId]
            );
            connection.release();
            res.json({ message: "Order item updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete order item
    deleteOrderItem: async (req, res) => {
        try {
            const connection = await pool.getConnection();
            await connection.query(
                'DELETE FROM Order_Item WHERE order_id = ? AND order_item_seq_id = ?',
                [req.params.orderId, req.params.itemId]
            );
            connection.release();
            res.json({ message: "Order item deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = orderController;
