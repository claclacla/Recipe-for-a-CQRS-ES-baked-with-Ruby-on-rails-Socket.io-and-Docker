Rails.application.routes.draw do
  resources :order_products
  resources :orders
  resources :products
  resources :articles
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
