const pool = require('../config/DBConn');

const makeReservation = async (req, res) => {
    const {items, reservation_id, user_email} = req.body;
    let reserved_items=[];
    let reserved_products=[];
    if (!items || !reservation_id || !user_email) {
        return res.status(403).send('missing details');
    }
    try {
        for (let index = 0; index < items.length; index++) {
            setTimeout(async ()=>{
                const reserved = await pool.query("UPDATE product SET is_reserved=$1, reserved_until=CURRENT_TIMESTAMP + interval '1 day' WHERE product_id=$2 returning *", [true, items[index]])
                if (reserved.rows.length > 0) {
                  reserved_items.push(reserved.rows);
                } else{
                    return res.status(401).send('Something went wrong')
                }
                if (index==items.length-1) {
                    try {
                        for (let index = 0; index < items.length; index++) {
                        setTimeout(async ()=>{
                            const reserving = await pool.query("INSERT INTO reservation (reservation_id, user_email, product_id, reserved_until) VALUES ($1, $2, $3, CURRENT_TIMESTAMP + INTERVAL '1 day')", [reservation_id[0].res_id, user_email, items[index]])
                            if (reserving.rows.length > 0) {
                                reserved_products.push(reserving.rows);
                              }
                        }, 100)
                    }
                    return res.status(201).send(reserved_products);
                    } catch (error) {
                        res.json(error)
                    }
                }
            }, 100)
        }
      } catch (error) {
        res.json(error)
      } 
}

module.exports = {makeReservation};