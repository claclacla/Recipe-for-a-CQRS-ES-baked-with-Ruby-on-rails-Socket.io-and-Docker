require 'faraday'
require 'faraday_middleware'

describe "Insert a new order" do
  before do
    @connection = Faraday.new 'http://api-server:3000' do |conn|
      conn.response :json, :content_type => /\bjson$/
    end
  end

  it "should get a list of products" do
    response = @connection.get "/products"

    puts response.body
  end

  # it "should insert a new order" do
  #   response = @conn.post '/orders', { "order": 
  #     { "products": [ 
  #       { "_id": "Product 1", "price": 5.0 } 
  #     ] } 
  #   }

  #   puts response.body
  # end
end