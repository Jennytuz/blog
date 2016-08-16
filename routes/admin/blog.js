var Blog = require('../../models/Blog')
var BlogType = require('../../models/BlogType')
var express = require('express');
var router = express.Router();
var moment = require('moment');

//////列表页
router.get('/:page', function (req, res, next) {
    //res.send('respond with a resource');
    //
    var page = req.params.page;
    page = page || 1;
    page = parseInt(page);
    var pageSize = 8;
    var filter = {}

    var title = req.query.title

    if (!!title) {
        filter.title = {
            '$regex': `.*?${title}.*?`
        }
    }
    ///////待改
    BlogType.dal.findByFilter({}, function (typeData) {
        Blog.dal.getListByPage(filter, page, pageSize, function (data) {
            console.log(data)
            data.data = data.data.map(function (item) {
                item = item.toObject() //把item转换为js对象
                try {
                    item.typeName = "暂无分类"
                    item.typeName = typeData.filter(function (temType) {
                        return item.type == temType._id
                    })[0].title

                }
                catch (ex) {

                }
                item.id = item._id.toString() //把属性_id赋值给id
                delete item._id
                return item

            })

            data.title = "博客列表管理"
            data.query = req.query
            res.render('admin/blog/index', data)
        })

    })


});

/////编辑页面 添加和修改在一起
router.get('/editor/:id', function (req, res, next) {
    BlogType.dal.findByFilter({}, (type_data) => {
        type = type_data
        Blog.dal.getModelById(req.params.id, (data) => {
            if (data.id) {
                // data.title = '信息编辑'
                res.render('admin/blog/editor', {
                    data: data,
                    type: type
                })
            } else {
                // res.send('err')
                data = new Blog.db.Blog()
                // data = data.toObject()
                // data.id = data._id
                // delete data._id
                data.isAdd = true /////是否为新增,如果是新增 为密码添加验证规则
                data.title = '博客标题'
                res.render('admin/blog/editor', {
                    data: data,
                    type: type
                })
            }
        })
    })
});
//////编辑表单提交
router.post('/editor/:id', function (req, res, next) {
    var model = req.body;
    if (!!req.params.id) {
        model.create_time = Date();
    }
    else {
        model.update_time = Date();
    }
    Blog.dal.update(req.params.id, model, true, (data) => {
        if (data) {
            //res.json(data)
            res.redirect('/admin/blog/1');
        } else {
            res.send('err')
        }
    })
});

///////删除操作
router.post('/delete', function (req, res, next) {
    if (req.body.id) {
        Blog.dal.remove(req.body.id, (data) => {
            if (data) {
                console.log('删除成功');
            } else {
                console.log('删除失败')
            }
            res.redirect('/admin/blog/1');
        })
    } else {
        res.redirect('/admin/blog/1');
    }
})

module.exports = router;
