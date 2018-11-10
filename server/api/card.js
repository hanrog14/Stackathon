const router = require('express').Router();
const {Card} = require('../db');

// GET route for finding a card
router.get('/:id', async (req, res, next) => {
    try {
        const card = await Card.findById(req.params.id);
        res.send(card);
    } catch (err) {next(err)}
})

module.exports = router