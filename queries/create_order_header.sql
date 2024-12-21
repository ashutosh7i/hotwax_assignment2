CREATE TABLE Order_Header (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_date DATE NOT NULL,
    customer_id INT NOT NULL,
    shipping_contact_mech_id INT NOT NULL,
    billing_contact_mech_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (shipping_contact_mech_id) REFERENCES Contact_Mech(contact_mech_id),
    FOREIGN KEY (billing_contact_mech_id) REFERENCES Contact_Mech(contact_mech_id)
);