require 'faraday'
require 'faraday_middleware'

describe "Place an order" do
  before do
    @connection = Faraday.new 'http://api-server:3000' do |conn|
      conn.request :json
      conn.response :json, :content_type => /\bjson$/

      conn.adapter Faraday.default_adapter
    end
  end

  context "when the order contains valid products" do
    it "should place a new order" do
      response = @connection.get "/products"
      products = response.body
  
      expect(products.length).to be > 0
  
      product = products[0]
      productUid = product["uid"]
  
      response = @connection.post '/orders', { "order": 
        { "products": [ 
          { "uid": productUid, "amount": 4 } 
        ] } 
      }
  
      puts response.body
    end
  end
end