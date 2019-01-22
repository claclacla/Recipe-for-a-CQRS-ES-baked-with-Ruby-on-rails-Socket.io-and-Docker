class Product
  include Mongoid::Document
  
  field :uid, type: String
  field :name, type: String
  field :price, type: Float
end
