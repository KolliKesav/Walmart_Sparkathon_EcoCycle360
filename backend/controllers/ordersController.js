import { db } from "../libs/database.js";

db.connect();

export const getOrders = async (req, res) => {

    try {
        const response = await db.query(`SELECT * FROM placed_orders R JOIN addresses A ON R.shipment_address_id = A.id`);
        
        // console.log("Users: ", response);
        
        res.status(200).json({
            status: "success",
            message: "Retreived All users successfully.",
            users: response.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.query('SELECT * FROM placed_orders R JOIN addresses A ON R.shipment_address_id = A.id WHERE customer_id = $1', [id]);
        console.log("PO: ", response.rows);
        
        res.status(200).json({
            status: "success",
            message: "Retreived user successfully.",
            orders: response.rows
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error "});
    }
}