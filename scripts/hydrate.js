const { pool,testConnection} = require("../dbConnection.js");
const bcrypt = require('bcryptjs');

const SQL_QUERIES = {
    insert_users: async (connection) => {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await connection.query(`
            INSERT INTO User (username, password) VALUES
            ('admin', ?)
        `, [hashedPassword]);
    },

    insert_customers: `
        INSERT INTO Customer (first_name, last_name) VALUES
        ('John', 'Doe'),
        ('Jane', 'Smith');
    `,
    
    insert_contact_mech: `
        INSERT INTO Contact_Mech (customer_id, street_address, city, state, postal_code, phone_number, email) VALUES
        (1, '1600 Amphitheatre Parkway', 'Mountain View', 'CA', '94043', '(650) 253-0000', 'john.doe@example.com'),
        (1, '1 Infinite Loop', 'Cupertino', 'CA', '95014', '(408) 996-1010', 'john.doe@work.com'),
        (2, '350 Fifth Avenue', 'New York', 'NY', '10118', '(212) 736-3100', 'jane.smith@example.com');
    `,
    
    insert_products: `
        INSERT INTO Product (product_name, color, size) VALUES
        ('T-Shirt', 'Red', 'M'),
        ('Jeans', 'Blue', '32'),
        ('Sneakers', 'White', '9'),
        ('Jacket', 'Black', 'L'),
        ('Hat', 'Green', 'One Size');
    `
};

const hydrateDatabase = async () => {
    const connection = await pool.getConnection();
    try {
        // Execute queries in sequence
        for (const [key, query] of Object.entries(SQL_QUERIES)) {
            if (typeof query === 'function') {
                await query(connection);
            } else {
                await connection.query(query);
            }
            console.log(`Executed ${key} successfully`);
        }
        
        console.log('Database hydrated successfully');
    } catch (error) {
        console.error('Error hydrating database:', error);
    } finally {
        connection.release();
    }
};

// Execute if running directly
if (require.main === module) {
    hydrateDatabase().then(() => process.exit());
}

module.exports = hydrateDatabase;