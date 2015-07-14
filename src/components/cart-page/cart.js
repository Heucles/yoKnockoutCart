define(["knockout", "text!./cart.html"], function(ko, cartTemplate) {

	var _CartItem = function(args){
		var self = this;
		self.sku = args.sku || "";
		self.quantity = args.quantity || 1;

		return self;
	}

	var _Cart = function () {
		var self = this;
		//var items = []; //instead of this line, we did the one bellow
		self.items = ko.observableArray([]);

		self.addItemClicked = function(ev){
			var sku = $(ev.currentTarget).data('sku');
			return self.addItem({sku : sku});
		};

		self.addItem = function(item){
			var existingItem = self.findBySku(item.sku);
			if(existingItem){
				existingItem.quantity+=1;
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

		Cart: _Cart, 
		template: cartTemplate };

	});