module Mongoid
  class OrderRepository
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
      Order.find(uid)
    end
  
    # TODO: Add filters(skip, limit, sort)
  
    def get match: nil 
      Order.all
    end
  
    def remove filter:
      
    end
  
    implements Repositories::IRepository
  end
end