const pool = require('../config/DBConn');

const getProductForm = async (req, res) => {
    try {
        const conditions = await pool.query('SELECT * FROM quality')
        const categories = await pool.query('SELECT * FROM item_type')
        const subCategories = await pool.query('SELECT * FROM category')
        const sizes = await pool.query('SELECT * FROM sizes')
        const colours = await pool.query('SELECT * FROM colour')
        const genders = await pool.query('SELECT * FROM gender')

        res.json({'categories': categories.rows, 'subCategories': subCategories.rows, 'conditions': conditions.rows, 'sizes': sizes.rows, 'colours': colours.rows, 'genders': genders.rows})
    } catch (error) {
        res(error)
    }
}

module.exports = {getProductForm};