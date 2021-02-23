import AMap from 'AMap'

//对获取的地址信息进行处理
export function Address(date,formattedAddress){
    this.province=date.province;
    this.district=date.district;
    this.city=date.city;
    this.township=date.township;
    this.street=date.street;
    this.streetNumber=date.streetNumber;
    this.formatted=formattedAddress;
}

//混入（定位）
export const mapMixins={
    methods: {
        //精准定位
        userPosition() {
            let self=this;
            AMap.plugin('AMap.Geolocation', () => {
                let geoLocation = new AMap.Geolocation({
                    enableHighAccuracy: true,
                    zoomToAccuracy: true,
                    buttonOffset: new AMap.Pixel(10, 20),
                    buttonPosition: 'LB'
                })
                geoLocation.getCurrentPosition();
                AMap.event.addListener(geoLocation, 'complete', onComplete);
                AMap.event.addListener(geoLocation, 'error', onError);
                function onComplete(data) {
                    //向vuex添加用户的地址
                    let formattedAddress=data.formattedAddress;
                    let date=data.addressComponent;
                    let address=new Address(date,formattedAddress);
                    self.$store.dispatch('position',address);
                }
                function onError() {
                    self.cityPosition();
                }
            })
        },

        //IP定位
        cityPosition(){
            let self=this;
            AMap.plugin('AMap.CitySearch',()=>{
                let citySearch=new AMap.CitySearch();
                citySearch.getLocalCity((status,res)=>{
                    AMap.plugin('AMap.Geocoder',function (){
                        let geoCoder=new AMap.Geocoder({
                            city:res.adcode
                        });
                        let lngLat=res.rectangle.split(";")[0].split(",");
                        geoCoder.getAddress(lngLat,function (status,data){
                            let date=data.regeocode.addressComponent
                            let formatterAddress=data.regeocode.formattedAddress;
                            if(status==='complete'&&data.info==="OK"){
                                let address=new Address(date,formatterAddress);
                                self.$store.dispatch('position',address)
                            }
                        });
                    })
                })
            })
        }
    }
}


//混入，高德搜索提示
export const place={
    watch:{
        place(){
            let self=this;
            AMap.plugin('AMap.Autocomplete',function (){
                let autoOptions={
                    city:"全国"
                };
                let autoComplete=new AMap.Autocomplete(autoOptions);
                autoComplete.search(self.place,(status,result)=>{
                    self.searchResult=result.tips;
                })
            })
        }
    }
}
