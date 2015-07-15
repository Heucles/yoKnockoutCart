define(["knockout", "jquery","text!./cart.html"], function(ko,$, cartTemplate) {

	var _CartItem = function(args){
		var self = this;
		self.sku = args.sku || "";
		self.quantity = args.quantity || 1;

		return self;
	}

	var _CartViewModel = function () {
		var self = this;
		//var items = []; //instead of this line, we did the one bellow

		self.loadFromStorage = function () {
			var stored = localStorage.getItem('HeuclesCart'); //TODO: TRANSFORM INTO SETTING
			var result = [];

			if (stored){
				result = JSON.parse(stored);
			}

			return result;
		}

		self.items = ko.observableArray(self.loadFromStorage());

		self.addItemClicked = function(viewModel,ev){
			var sku = $(ev.currentTarget).data('sku');
			if (sku){
				self.addItem({sku : sku});
			}
		};

		self.addItem = function(item){
			var existingItem = self.findBySku(item.sku);
			if(existingItem){
				existingItem.quantity+=1;
				//this is a hack because knockout is unable to make every change in the array observable
				//only adds and removes

				var oldItems = self.items.removeAll();
				self.items(oldItems);

				return existingItem;
			}else{
				var newItem = new _CartItem(item);
				self.items.push(newItem);
				return newItem;
			}
		}
		self.itemCount = function(){
			return self.items().length;
		}

		self.empty = function(){
			//self.items = [];
			self.items.removeAll(); //knockout methods
		}

		self.findBySku = function(sku){
			return ko.utils.arrayFirst(self.items(),function(item){
				return item.sku === sku;
			});
		}

		self.removeItemClicked = function(data,ev){
			console.log(data);
			self.removeItem(data.sku);
		};

		self.removeItem = function (sku) {
			var item = self.findBySku(sku);
			if(item){
				self.items.remove(item);
			}
		}

		self.items.subscribe(function (items) {
			localStorage.setItem('HeuclesCart',JSON.stringify(items));
		});

		return self;
	}

	return { 

		viewModel: _CartViewModel, 
		template: cartTemplate };

	});