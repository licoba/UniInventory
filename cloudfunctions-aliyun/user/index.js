'use strict';
const db = uniCloud.database() // 获取数据库的引用


let response = {
	code: -1,
	msg: "no msg",
	data: []
}

exports.main = async (event, context) => {
	//event为客户端上传的参数
	//context中可获取客户端调用的上下文
	let res = 'true'
	console.log("==> 请求云函数的user模块,参数：", event)
	const collection = db.collection('user') // 获取 `user` 集合的引用，这里的collection就是一张表
	switch (event.method) {
		case 'login':
			console.log("请求登录接口：", event.method)
			res = await checkLogin(collection, event)
			console.log("请求登录接口结果：", res)
			break;
		case 'getAllUsers':
			console.log("获取所有用户：", event.method)
			res = await getAllUsers(collection, event)
			console.log("请求获取所有用户接口结果：", res)
			break;
		default:
			break;
	}
	return res
};


async function checkLogin(collection, event) {
	let user = null
	let queryresult = []
	const username = event.username
	const password = event.password
	const phone = event.phone

	if (collection && event) {
		queryresult = await collection.where({
			phone: event.phone,
		}).get()
		// console.log("queryresult：", queryresult)
	}
	if (queryresult.data.length > 0) user = queryresult.data[0]
	if (!user) {
		response.code = 1002
		response.msg = "用户不存在"
		response.data = null
	} else {
		if (password == user.password) {
			const phoneList = ["17322309201", "13617162005", "13094235118", "15571638882", "15392759526", "13554585085"]
			if (phoneList.includes(event.phone)) {
				response.code = 1
				response.msg = '登录成功'
				response.data = user
			} else {
				response.code = 1006
				response.msg = '无权限登录，请联系17322309201'
				response.data = null
			}
		} else {
			response.code = 1003
			response.msg = '密码错误'
			response.data = null
		}
	}
	return response
};

// 查找当前公司名下的所有员工
async function getAllUsers(collection, event) {
	let queryresult = []
	const company = event.company

	if (collection && event) {
		queryresult = await collection.where({
			company: event.company,
		}).get()
	}
	if (queryresult.data.length >= 0) {
		response.code = 1
		response.msg = "查询成功"
		response.data = queryresult.data
	} else {
		response.msg = "查询失败"

	}
	return response
};
