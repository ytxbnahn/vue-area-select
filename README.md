# 基于vue的三级地址选择器

------
## 0.演示
	调试手机模式[demo](https://htmlpreview.github.io/?https://github.com/ytxbnahn/vue-area-select/blob/master/demo.html)
## 1.目标实现效果
    1.点击弹出select选择框
    2.初始显示省份，点击省份显示对应的市，以此类推。
    3.没有对应的市过着区市显示为空或无

## 2. 实现思路

```javaScript
@requires_authorization
var JSON_ = [
    {
        "id": "110000", 
        "name": "北京市", 
        "child": [
            {
                "id": "110100", 
                "name": "北京市市辖区", 
                "child": [
                    {
                        "id": "110101", 
                        "name": "东城区", 
                        "child": [ ]
                    }, 
                    {
                        "id": "110102", 
                        "name": "西城区", 
                        "child": [ ]
                    }
                ]
            }
        ]
    }]
```
    1.当我们点击北京市 显示北京市市辖区 以此类推 北京为JSON_[0] 下一级显示为为JSON_[0].child的list
    以此类推为 JSON_[0].child[it].child 的list，it为上一级选中的项。以上为基本实现逻辑
## 3.遇到问题
    1.在开发过程中使用了vue，并且将其做成了一个组件。所以在写组件时要注意组件之间的传值问题，并且模板必须包裹在一个大的标签中。
    2.在模板中写绑定的class时与在页面中有不同之处需要注意
