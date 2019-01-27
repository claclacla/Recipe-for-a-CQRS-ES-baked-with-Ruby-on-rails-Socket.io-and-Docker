Order.delete_all

Order.create(
  number: 1, 
  date: DateTime.parse("2019-02-15T04:05:06"), 
  products: [
    OrderProduct.new(name: "Product 1", price: 2.50)
  ]
)