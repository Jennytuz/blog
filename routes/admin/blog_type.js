var BlogType = require('../../models/BlogType')
var express = require('express');
var router = express.Router();


//////列表页
router.get('/:page', function(req, res, next) {
    //res.send('respond with a resource');
    //
     var page = req.params.page;
    page = page || 1;
	page = parseInt(page);
    var pageSize = 8;
    var filter = {}

    var filter = {}

    var title = req.query.title

    if (!!title) {
        filter.title = {
            '$regex': `.*?${title}.*?`
        }
    }


    BlogType.dal.getListByPage(filter, page, pageSize, function(data) {
        data.title = "博客分类管理"
        data.query = req.query
        res.render('admin/blog_type/index', data)
    })


});

/////编辑页面 添加和修改在一起
router.get('/editor/:id', function(req, res, next) {
    BlogType.dal.getModelById(req.params.id, (data) => {
        if (data.id) {
            // data.title = '信息编辑'
            res.render('admin/blog_type/editor', {
                data: data
            })
        } else {
            // res.send('err')
            data = new BlogType.db.BlogType()
                // data = data.toObject()
                // data.id = data._id
                // delete data._id
            data.isAdd = true /////是否为新增,如果是新增 为密码添加验证规则
            data.title = '信息编辑'
            res.render('admin/blog_type/editor', {
                data: data
            })
        }
    })
});
//////编辑表单提交
router.post('/editor/:id', function(req, res, next) {
    var model = req.body;
    if(!!req.params.id){
        model.create_time = Date();
    }
    else{
        model.update_time = Date();
    }
    BlogType.dal.update(req.params.id, model, true, (data) => {
        if (data) {
            //res.json(data)
            res.redirect('/admin/BlogType/1');
        } else {
            res.send('err')
        }
    })
});

///////删除操作
router.post('/delete', function(req, res, next) {
    if (req.body.id) {
        BlogType.dal.remove(req.body.id, (data) => {
            if (data) {
                console.log('删除成功');
            } else {
                console.log('删除失败')
            }
            res.redirect('/admin/BlogType/1');
        })
    } else {
        res.redirect('/admin/BlogType/1');
    }
})

module.exports = router;
