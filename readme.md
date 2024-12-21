todo-
1. design db
2. write sql scripts
3. write apis

db info-
1. primary key - auto increment
2. foreign key - reference to another table

## Creating Tables-

1. Customer
``` create table Customer(
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
);
```

// contact mechanism/address
2. Contact_Mech
``` CREATE TABLE Contact_Mech (
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

// product table
3. Product
``` CREATE TABLE Product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    color VARCHAR(30),
    size VARCHAR(10)
);
```

// order header
4. Order_Header
```
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
```

// order item
5. Order_Item
```
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
```

## Inserting Data-

1. Customers
```
INSERT INTO Customer (first_name, last_name) VALUES
('John', 'Doe'),
('Jane', 'Smith');
```

2. Contact_Mech
```
# for john doe
INSERT INTO Contact_Mech (customer_id, street_address, city, state, postal_code, phone_number, email) VALUES
(1, '1600 Amphitheatre Parkway', 'Mountain View', 'CA', '94043', '(650) 253-0000', 'john.doe@example.com'),
(1, '1 Infinite Loop', 'Cupertino', 'CA', '95014', '(408) 996-1010', 'john.doe@work.com');

# for jane smith
INSERT INTO Contact_Mech (customer_id, street_address, city, state, postal_code, phone_number, email) VALUES
(2, '350 Fifth Avenue', 'New York', 'NY', '10118', '(212) 736-3100', 'jane.smith@example.com');

```

3. Products
```
INSERT INTO Product (product_name, color, size) VALUES
('T-Shirt', 'Red', 'M'),
('Jeans', 'Blue', '32'),
('Sneakers', 'White', '9'),
('Jacket', 'Black', 'L'),
('Hat', 'Green', 'One Size');
```

# API Creation

createOrder:
1. Insert order header first
2. Insert all order items using the new order_id
3. Return success with new order ID

getOrder:
1. Execute JOIN query on Order_Header to fetch:
   - Order header details oh
   - Associated order items oi
   - Related customer info c
   - Contact mechanism details cm
2. Return complete order details

updateOrder:
Steps:
1. Extract shipping and billing contact IDs from order_id
2. Update Order_Header table
3. Return success message

deleteOrder:
Steps:
1. Delete order items first (maintain referential integrity)
2. Delete order header
3. Return success message

addOrderItem:
Steps:
1. Insert new item into Order_Item table
2. Return success message

updateOrderItem:
Steps:
1. Update specific order item using order_id and item_id
2. Return success message

deleteOrderItem:
Steps:
1. Delete specific item using order_id and item_id
2. Return success message





## usage-

1. Start Development Server
```
npm run dev
```
Truncate Database (Optional)
```
npm run truncate
```
Hydrate Database with Sample Data
```
npm run hydrate
```
```
Run API Tests
npm run test
```

Common Workflows
Start Fresh and Test:
```
npm run truncate
npm run hydrate
npm run test
```


## api documentation-

1. Create Order
POST /orders
{
    "order_date": "2024-01-20",
    "customer_id": 1,
    "shipping_contact_mech_id": 1,
    "billing_contact_mech_id": 2,
    "order_items": [
        {
            "product_id": 1,
            "quantity": 2,
            "status": "CREATED"
        },
        {
            "product_id": 2,
            "quantity": 1,
            "status": "CREATED"
        }
    ]
}

2. Retrieve Order
GET /orders/1

3. Update Order Item
PUT /orders/1/items/2
{
    "quantity": 2,
    "status": "UPDATED"
}

4. Add Order Item
POST /orders/1/items
{
    "product_id": 3,
    "quantity": 1,
    "status": "CREATED"
}

5. Delete Order Item
DELETE /orders/1/items/1

6. Delete Order
DELETE /orders/1
