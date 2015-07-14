define(['components/cart-page/cart'], function(cart) {
  var cart = new cart.Cart();
  describe('Cart', function() {

    it('exists', function(){
      expect(cart).toBeDefined();
      expect(true).toBe(true);
    });
  });

  describe('adding 1 item', function() {

   beforeEach(function() {
     cart.empty();
     cart.addItem({sku:'skis'})
   });

   it('has an add function', function() {
    cart.addItem({sku:'skis'})
  });

   it('increments itemCount by 1', function() {
    expect(cart.itemCount()).toEqual(1);
  });

   it('finds by sku', function() { 
    expect(cart.findBySku('skis').sku).toEqual('skis');
  });

   it('increments quantity when same sku', function() {
    cart.addItem({sku:'skis'})
    cart.addItem({sku:'skis'})

    expect(cart.itemCount()).toEqual(1); 

  });

   describe('removing items', function() {
    beforeEach(function() {
      cart.addItem({sku:'skis'});
    });

    it('removes by sku', function() {
      cart.removeItem('skis');
      expect(cart.itemCount()).toEqual(0);
    });

  });


 });

});