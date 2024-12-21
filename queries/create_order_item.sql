CREATE TABLE Order_Item (
    order_item_seq_id INT AUTO_INCREMENT,
    order_id INT,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    PRIMARY KEY (order_item_seq_id, order_id),
    FOREIGN KEY (order_id) REFERENCES Order_Header(order_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);