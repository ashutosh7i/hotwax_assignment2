const { pool, testConnection} = require("../dbConnection");

const truncateDatabase = async () => {
    const connection = await pool.getConnection();
    try {
        await connection.query('SET FOREIGN_KEY_CHECKS = 0');
        
        await connection.query('TRUNCATE TABLE Order_Item');
        await connection.query('TRUNCATE TABLE Order_Header');
        await connection.query('TRUNCATE TABLE Product');
        await connection.query('TRUNCATE TABLE Contact_Mech');
        await connection.query('TRUNCATE TABLE Customer');
        
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');
        
        console.log('All tables truncated successfully');
    } catch (error) {
        console.error('Error truncating tables:', error);
    } finally {
        connection.release();
    }
};

// Execute if running directly
if (require.main === module) {
    truncateDatabase().then(() => process.exit());
}

module.exports = truncateDatabase;
