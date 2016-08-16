var BlogType = require('../../models/BlogType')
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var filter = {}

    BlogType.dal.findByFilter(filter, function (data) {
        res.json({ status: "y", data: data })
    })
})


module.exports = router;