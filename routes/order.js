const router = require("express").Router();
const orderController = require("../controllers/orderController");

// Order routes
// 1. create an order for customer
router.post("/orders", orderController.createOrder);
// 2. retrieve single order info with id
router.get("/orders/:orderId", orderController.getOrder);
// 3. update an order info with id
router.put("/orders/:orderId", orderController.updateOrder);
// 4. delete an order with id
router.delete("/orders/:orderId", orderController.deleteOrder);

// Order items routes
// 5. add new item to existing order
router.post("/orders/:orderId/items", orderController.addOrderItem);
// 6. update order details with item id
router.put("/orders/:orderId/items/:itemId", orderController.updateOrderItem);
// 7. delete an item from order
router.delete("/orders/:orderId/items/:itemId", orderController.deleteOrderItem);

module.exports = router;
