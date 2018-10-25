new Vue({
	el:".address",
	data:{
		addressList:[],
		showNum:3,
		curIndex:0,
		delFlag:false,
		addFlag:false,
		curAddress:{},
		operType:'',
		shipMethod:'standard'
	},
	computed:{
		showAddress:function(){
			return this.addressList.slice(0,this.showNum);
		}
	},
	mounted: function () {
		var _this=this;
  		this.$nextTick(function () {
    		_this.$http.get("data/address.json").then(function(res){
    			_this.addressList=res.data.result;
    		})
  		})
	},
	methods:{
		setDefaultAddress:function(){
			var _this=this;
			this.addressList.forEach(function(item,index){
				if(_this.curIndex==index){
					item.isDefault=true;
				}else{
					item.isDefault=false;
				}
			})
		},
		delItem:function(){
			this.addressList.splice(this.curIndex,1);
			this.curIndex=0;
			this.delFlag=false;
		},
		saveAddress:function(){
			if(this.operType=="create"){
				this.$set(this.curAddress,"isDefault",false);
				this.addressList.push(this.curAddress);
				this.showNum = this.showNum==3?3:this.addressList.length;
			}else{
				this.addressList[this.curIndex].userName=this.curAddress.userName;
				this.addressList[this.curIndex].streetName=this.curAddress.streetName;
				this.addressList[this.curIndex].tel=this.curAddress.tel;
			}
			
			this.addFlag=false;
			this.curAddress={};
		},
		operAddress:function(type){
			this.operType=type;
			this.curAddress={};
			if(type=="change"){
				this.curAddress.userName=this.addressList[this.curIndex].userName;
				this.curAddress.streetName=this.addressList[this.curIndex].streetName;
				this.curAddress.tel=this.addressList[this.curIndex].tel;
				this.curAddress.isDefault=this.addressList[this.curIndex].isDefault;
			}
			this.addFlag=true;
		}
		
	}
})