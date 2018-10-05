// 头部
var takeawayHead= [
{ "shopLogo": '/image/surface.png', "shopName": '好好好吃', "noticePic": '/image/notice.png', "noticeText": '尊敬的新老客户！本店于11点开始配送外卖', "shopOffer": '￥8起送 | 30送达 | 商家配送（6公里内）' }
]
// 新用户
var takeawayNew=[
  { "npic": '/image/new.png', "newText": "新用户下单立减2.00(不与其他活动同享)", "dpic": '/image/option.png' }
] 
// 菜单
var goods= [
  { "id": 1, "name": '果盘1', "icon": '/image/new.png', "sold": 1014, "price": 120, "oldprice": 150 },
  { "id": 2, "name": '果盘2', "icon": '/image/new.png', "sold": 1029, "price": 100, "oldprice": 150 },
  { "id": 3, "name": '果盘3', "icon": '/image/new.png', "sold": 1030, "price": 5, "oldprice": 10 },
  { "id": 4, "name": '果盘4', "icon": '/image/new.png', "sold": 1059, "price": 5, "oldprice": 10 },
  { "id": 5, "name": '果盘5', "icon": '/image/new.png', "sold": 1029, "price": 130, "oldprice": 150 },
  { "id": 6, "name": '果盘6', "icon": '/image/new.png', "sold": 1064, "price": 150, "oldprice": 180 },
  { "id": 7, "name": '果盘7', "icon": '/image/new.png', "sold": 814, "price": 200, "oldprice": 230 },
  { "id": 8, "name": '果盘8', "icon": '/image/new.png', "sold": 124, "price": 220, "oldprice": 250 },
  { "id": 9, "name": '果盘9', "icon": '/image/new.png', "sold": 102, "price": 300, "oldprice": 320 }
]
// 详情
var details= [
  {"name": '商家名称',"txt": '鲜味缘快餐'},
  {"name": '电话',"txt": '123456789'},
  {"name": '地址',"txt": '白云YH城'},
  {"name": '营业时间',"txt": '09：00-12：00 14：00-18：00'}
]
// 左导航
var goodsList= [
  { "id": 'hot', "classifyName": '热销', "goods": [1, 2, 3, 4, 5] },
  { "id": 'new', "classifyName": '美味双拼', "goods": [1, 3] },
  { "id": 'vegetable', "classifyName": '名炉烧味', "goods": [1, 6, 5] },
  { "id": 'mushroom', "classifyName": '人气超值套餐', "goods": [1, 7, 8, 9] },
  { "id": 'food', "classifyName": '开心加料', "goods": [3, 4] },
  { "id": 'new', "classifyName": '最新推荐', "goods": [3, 4] },
  { "id": 'soup', "classifyName": '老火汤', "goods": [3, 4] }
]
// 定义数据出口
module.exports = {
  postList: goods,
  postgoodsList: goodsList,
  takeawayHead: takeawayHead,
  takeawayNew: takeawayNew,
  details: details,
}