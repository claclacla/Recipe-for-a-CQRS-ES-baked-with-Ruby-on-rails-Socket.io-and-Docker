# Products 

Product.delete_all

Product.create(uid: "1r4Yp0WrTlogt6h1", name: "Product 1", price: 2.50)
Product.create(uid: "erou29r83uroeiu2", name: "Product 2", price: 7.50)

# Orders

Order.delete_all

Order.create(
  number: 1, 
  date: DateTime.parse("2019-02-15T04:05:06"), 
  products: [
    OrderProduct.new(name: "Product 1", price: 2.50)
  ]
)