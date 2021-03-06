var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

////引入arttemplate模板
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//////kindeditor测试部分内容
app.use('/', require('./routes/common/kindeditor/demo'));
/////kindeditor文件上传部分代码
app.use('/common/kindeditor', require('./routes/common/kindeditor/index'));

/**
 * 初始化项目的一些基础目录结构
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function initApp(req, res, next) {
    /////判断目录是否存在
    fs.exists('./public/uploads', function (d) {
        if (d) {
            console.log('上传目录已存在');
            next();
        }
        else {
            /////创建一个在项目根目录中创建一个notes目录
            fs.mkdirSync('./public/uploads');
            console.log('初始化上传目录完成');
            next();
        }
    })
}

var AdminUser = require('./models/AdminUser')

////引入crypto模块
const crypto = require('crypto')

//管理后台登陆的路由必须放在登陆权限判断的前面 否则会陷入死循环
app.get('/admin/login',(req,res)=>{
	res.render('admin/login')
})
app.post('/admin/login',(req,res)=>{
	AdminUser.dal.findOneByFilter({user_name:req.body.userName},function(data){
		console.log(data)
		console.log(req.body)
		if(data){
			const md5 = crypto.createHash('md5')
			var password = req.body.password

			if(data.is_encrypt == 1){
				password = md5.update(password).digest('hex').toString()
			}
			console.log(password)
			console.log(data.pwd)
			if(password == data.pwd){
				/////登陆成功后把id写入cookie
                ///此处写cookie的path参数 表示cookie的作用范围
				res.cookie('user',data.id,{path:'/'})
				// res.redirect('/admin/adminUser/1')
				res.json({status:"y",msg:"登陆成功"})
				
			}
			else{
				res.json({status:"n",msg:"密码错误"})
			}
		}
		else{
			res.json({status:"n",msg:"用户信息不存在"})
		}
	})
})
app.get('/admin/validateUser', (req, res) => {
    AdminUser.dal.findOneByFilter({ user_name: req.query.user_name }, function (data) {
        console.log(data)
        if (data) {
            res.send('false')
        }
        else {
            res.send('true')
        }
    });
})

app.get('/admin/getLoginedUser',(req,res)=>{
	AdminUser.dal.getModelById(req.cookies.user,function(data){
		if(data){
			console.log(data);
			res.json({status:"y",msg:"获取数据成功",data:{user_name:data.user_name,avatar:data.avatar}});
		}
		else{
			res.json({status:"n",msg:"获取数据失败"})
		}
	})
})

/**
 * 通过此方法判断是访问的管理后台目录,在此处做用户是否登录的权限判断
 * [all description]
 * @param  {[type]} '/admin/*'    [description]
 * @param  {[type]} (req,res,next [description]
 * @return {[type]}               [description]
 */
app.all('/admin/*', (req, res, next) => {
	console.log('这里访问的是管理后台...')
	if (req.cookies.user) {
		AdminUser.dal.getModelById(req.cookies.user,function(data){
			if(data){
				next()
			}
			else{
				res.redirect('/admin/login')
			}
		})
	}
	else {
		res.redirect('/admin/login')
	}
})

app.get('/', initApp, (req, res) => {
	res.send('app启动');
	//res.redirect('/student/list/1');
})
////文件上传
app.use('/common', require('./routes/common/common'))
//////kindeditor测试部分内容
app.use('/',require('./routes/common/kindeditor/demo'));
/////kindeditor文件上传部分代码
app.use('/common/kindeditor', require('./routes/common/kindeditor/index'));
app.use('/admin/adminUser/', require('./routes/admin/admin_user'))
app.use('/admin/blogType',require('./routes/admin/blog_type'))
app.use('/admin/blog',require('./routes/admin/blog'))
app.use('/show_type',require('./routes/show/show_type'))
app.use('/show_blog',require('./routes/show/show_blog'))

var AdminUser = require('./models/AdminUser')


app.listen(3000, (req, res) => {
	console.log('服务器运行中。。。3000')
})