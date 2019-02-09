require 'faraday'
require 'faraday_middleware'

describe "Insert a product" do
  before do
    @connection = Faraday.new 'http://api-gateway' do |conn|
      conn.request :json
      conn.response :json, :content_type => /\bjson$/

      conn.adapter Faraday.default_adapter
    end
  end

  context "when the payload contains valid data" do
    it "should place a new product" do

      response = @connection.post '/products', {
        "data": {
          name: "Product 1"
        }
      }

      # Expected status: 202 Accepted
  
      # expect(response.status).to be == 202
    end
  end
end