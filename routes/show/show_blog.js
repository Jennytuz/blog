var Blog = require('../../models/Blog')
var express = require('express');
var router = express.Router();

router.get('/:id?', (req, res) => {
        var filter = {}
    
    if (req.params.id) {
        filter.type = req.params.id
        
    }
    Blog.dal.findByFilter(filter, function (data) {
            res.json({ status: "y", data: data })
            console.log(data)
        })

})

router.get('/blog/:id', (req, res) => {
    var filter = {}
    filter._id = req.params.id
    Blog.dal.findByFilter(filter, function (data) {
        res.json({ status: "y", data: data })
    })
})

module.exports = router;