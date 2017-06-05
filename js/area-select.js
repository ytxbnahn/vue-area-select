/**
 * Created by mty on 2017/3/29.
 */
Vue.component('area-select', {

    props:  ['data','status'],
    template: '<div>'+
            '<div class="area-mask " @click="select" :class="{mask_active: status}"></div>' +
                '<transition name="fade">'+
                '<div class="area-contain" :class="{area_contain_active: status}" v-if="status">'+
                '<section class="area-main">'+
                    '<header class="area-header">所在地区<i class="iconfont icon-close area-close" @click="select"></i></header>'+
                    ' <div class="area-top  border-a">'+
                        '<div class="area-province area-top-item" :class="{area_top_active: 1==areaStatus}" @click="selectArea(1)">{{CheckArea.province}}</div>'+
                        '<div class="area-city area-top-item" :class="{area_top_active: 2==areaStatus}" @click="selectArea(2)">{{CheckArea.city}}</div>'+
                        '<div class="area-region area-top-item" :class="{area_top_active: 3==areaStatus}" @click="selectArea(3)">{{CheckArea.region}}</div>'+
                    '</div>'+
                    '<div class="area-content border">'+
                    '<ul class="area-data" :class="{none: 1!=areaStatus}">'+
                        '<li class="area-data-item" v-for="(item,key,index) in data" @click="checkProvOne(key,item.name)" :class="{red: key==checkProvince}">'+
                        '<span class="area-text">{{item.name}}</span>'+
                        '<i class="icon-check iconfont" style="margin-left: 0.1rem" :class="{none: key != checkProvince}"></i>'+
                        '</li>'+
                    '</ul>'+
                    '<ul class="area-data" :class="{none: 2!=areaStatus}" v-if="data[checkProvince]">'+
                        '<li class="area-data-item" v-for="(item,key,index) in data[checkProvince].child" @click="checkCityOne(key,item.name,checkProvince)" :class="{red: key==checkCity}">'+
                        '<span class="area-text">{{item.name}}</span>'+
                        '<i class="icon-check iconfont"style="margin-left: 0.1rem" :class="{none: key != checkCity}"></i>'+
                        '</li>'+
                    '</ul>'+
                    '<ul class="area-data" :class="{none: 3!=areaStatus}" v-if="data[checkProvince]&&data[checkProvince].child[checkCity].child">'+
                        '<li class="area-data-item" v-for="(item,key,index) in data[checkProvince].child[checkCity].child" @click="checkRegionOne(key,item.name)" :class="{red: key==checkRegion}">'+
                        '<span class="area-text">{{item.name}}</span>'+
                        '<i class="icon-check iconfont" style="margin-left: 0.1rem" :class="{none: key != checkRegion}"></i>'+
                        '</li>'+
                    '</ul>'+
                    '</div>'+
                '</section>'+
                '</div>'+
                '</transition>' +
    '</div>',
    methods: {
        select: function () {
            window.ADDRESS = this.CheckArea;
            this.$emit('areashow',this.CheckArea)

        },
        selectArea: function (it) {
            this.areaStatus = it;
        },
        checkProvOne: function (it,name) {
            this.checkProvince = it;
            this.CheckArea.province = name;
            this.CheckArea.city = this.data[it].child[0].name;
            this.CheckArea.region = this.data[it].child[0].child
                &&this.data[it].child[0].child.length !=0
                ? this.data[it].child[0].child[0].name:'无';
            this.checkCity = 0;
            this.checkRegion = 0,
            this.areaStatus =2 ;
        },
        checkCityOne: function (it,name,its) {
            this.checkCity = it;
            this.CheckArea.province = this.data[its].name;
            this.CheckArea.city = name;
            this.CheckArea.region = this.data[its].child[it].child
                &&this.data[its].child[it].child.length!=0
                ? this.data[its].child[it].child[0].name:'无';
            this.checkRegion = 0,
            this.areaStatus =3 ;

        },
        checkRegionOne: function (it,name) {
            this.CheckArea.province = this.data[this.checkProvince].name;
            this.CheckArea.city = this.data[this.checkProvince].child[this.checkCity].name;
            this.checkRegion = it
            this.CheckArea.region = name;
        }
    },
    created: function () {
        this.$on('area-select', function (id) {
            // ...
        })
    },
    data: function(){
        return {
            maskStatus: true,
            areaStatus: 1,
            checkProvince: 0,
            checkCity: 0,
            checkRegion: 0,
            CheckArea: {
                province: '请选择',
                city: '请选择',
                region: '请选择'
            }
        }
    }
})