CREATE TABLE Contact_Mech (
    contact_mech_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    street_address VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(100),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);