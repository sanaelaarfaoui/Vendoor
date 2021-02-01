module.exports = function Cart(oldCart) {
  this.products = oldCart.products || {};
  this.totalProducts = oldCart.totalProducts || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.addToCart = (product, id) => {
      var storedProduct = this.products[id];
      if (!storedProduct) {
          this.products[id] = {
              product: product,
              quantity: 0,
              price: 0
          };
          storedProduct = this.products[id];
      }
      storedProduct.quantity++;
      storedProduct.price = storedProduct.product.price * storedProduct.quantity;
      this.totalProducts++;
      this.totalPrice += storedProduct.product.price;
  };

  this.removeFromCart = (product, id) => {
      var deletedProduct = this.products[id];
      deletedProduct.quantity--;
      deletedProduct.price -= deletedProduct.product.price;
      this.totalProducts--;
      this.totalPrice -= deletedProduct.product.price;
  }

  this.generateArray = () => {
      var arr = [];
      for (var id in this.products) {
          arr.push(this.products[id]);
      }
      return arr;
  };
};
