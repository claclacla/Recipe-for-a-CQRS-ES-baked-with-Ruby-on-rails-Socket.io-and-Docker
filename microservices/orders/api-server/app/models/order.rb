class Order
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :number, type: Integer
  field :date, type: Time
  embeds_many :order_products, store_as: "products"
end
