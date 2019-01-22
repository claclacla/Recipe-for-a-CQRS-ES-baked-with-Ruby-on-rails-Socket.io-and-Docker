require 'i18n'
require 'interface'

module Repositories
  IRepository = interface {
    required_methods :add, :update, :getByUid, :get, :remove
  }
end  
