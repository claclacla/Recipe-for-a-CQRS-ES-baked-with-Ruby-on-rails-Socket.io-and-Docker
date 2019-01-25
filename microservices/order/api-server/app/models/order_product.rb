class OrderProduct
  include Mongoid::Document
  
  field :name, type: String
  field :price, type: Float
  embedded_in :order
end