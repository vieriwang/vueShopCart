new Vue({
	el:"#app",
	data:{
		productList:[],
		checkFlag:false,
		showFlag:false,
		curIndex:''
	},
	mounted:function(){
		var _this=this;
		this.$nextTick(function(){
			_this.$http.get("data/cart.json").then(function(res){
				_this.productList=res.data.result.list;
			})
		})
	},
	filters:{
		showUnit:function(value){
			return value.toFixed(2);
		},
		showTotalUnit:function(value,unit){
			return "￥"+ value.toFixed(2)+ unit;
		}
	},
	computed:{
		totalMoney:function(){
			var money = 0;
			this.checkFlag=true;
			var _this=this;
			this.productList.forEach(function(item){
				if(item.check){
					money+=item.price*item.count;
				}else{
					_this.checkFlag=false;
				}
			});
			return money;
		}
	},
	methods:{
		checkChange:function(item){
			if(typeof item.check == "undefined"){
				this.$set(item,"check",true);
			}else{
				item.check = !item.check;
			}
		},
		checkAllFlag:function(flag){
			this.checkFlag = flag;
			var _this=this;
			this.productList.forEach(function(item){
				if(typeof item.check == "undefined"){
					_this.$set(item,"check",flag);
				}else{
					item.check = flag;
				}
			})
		},
		showDel:function(index){
			this.showFlag=true;
			this.curIndex=index;
		},
		delItem:function(){
			this.productList.splice(this.curIndex,1);
			this.showFlag=false;
		}
	}
})
