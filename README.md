# mock使用指南

## 第一步 启动开发项目服务

```
npm run dev
```
## 第二步 配置是否使用mock
```
//  src\common\baseConfig.js

// 把prefixUrl常量改为'/debugger/api'，即开始使用mock
// const prefixUrl = '/api';
const prefixUrl = '/debugger/api';
```
## 第三步 配置mock接口及数据

### 配置mock接口
```
// mock\index.json

// 键 --- 请求接口地址     值 --- 接口对应的mock返回值文件名称
// mock '/template/message/datagrid'接口的时候，使用的是mock\templateMessageList.json文件中的内容作为返回
{
    "/template/message/datagrid": "templateMessageList",
    "/news": "news"
}
```
### 配置mock返回值
```
// mock\templateMessageList.json

{
    "statusCode": "2000000",
    "data": {
        "pageSize": 10,
        "totalCount": 6,
        "totalPages": 1,
        "cPageNO": 1,
        "list": [
            {
                "id": "ff808081575305c0015753e1cc190019",
                "userID": "40289e5d519fe5e30151a400c8380042",
                "name": "okma",
                "title": null,
                "createTime": "2017-04-06 17:07:20",
                "updateTime": "2017-04-06 17:07:20"
            }
        ]
    }
}
```
## 第四步 完成配置

接下来你知道刷新页面，就可以看到页面中配置的mock接口的请求成功，并且返回了你设置的json数据

# simpleMock 的实现思想

用express拦截服务端的接口请求，如果在mock\index.json中配置了mock接口，那么在开启mock的情况下，读取接口对应的文件中的内容并作为返回数据返回给前端请求，如果在mock\index.json中没有配置接口内容，那么走正常的流程，请求服务端的接口并返回数据。

# simpleMock 的优点
* 随时改变json数据随时反映到页面上，不用重启服务，修改方便，响应及时
* 开启和关闭mock功能方便，只需修改src\common\baseConfig.js中的prefixUrl的值，不用重启服务
* 单个接口，单独配置返回内容的json文件，不会产生内容很多的文件，修改，查找方便
* 可以单独配置只有指定接口使用mock数据，其他接口仍然使用服务接口，模拟数据门槛低


# 以下为原本vueCli文档

## xbn_fe

> A Vue.js project

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
