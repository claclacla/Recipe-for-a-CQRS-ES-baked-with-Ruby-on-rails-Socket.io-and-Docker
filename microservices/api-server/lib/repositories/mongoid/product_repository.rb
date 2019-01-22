module Mongoid
  class ProductRepository
    def initialize 
  
    end
  
    # TODO: Add parameter type verification
    # TODO: Add error rescue
  
    def add orderEntity:

    end
  
    def update query:, orderEntity:
  
    end
  
    def patch query:, orderData:
  
    end
  
    # TODO: Add uid verification
    # TODO: Add not found rescue
  
    def getByUid uid:
      Product.find(uid)
    end
  
    # TODO: Add filters(skip, limit, sort)
  
    def get match: nil 
      Product.all
    end
  
    def remove filter:
      
    end
  
    implements Repositories::IRepository
  end
end