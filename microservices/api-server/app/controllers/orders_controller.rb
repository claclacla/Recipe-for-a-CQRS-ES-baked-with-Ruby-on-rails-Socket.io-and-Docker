class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :update, :destroy]

  include Repositories::Mongoid

  def initialize 
    @orderRepository = Mongoid::OrderRepository.new
  end

  # GET /orders
  def index
    orders = @orderRepository.get

    render json: orders
  end

  # GET /orders/1
  def show
    order = @orderRepository.getByUid(uid: params[:id])
    
    render json: order
  end

  # POST /orders
  def create
    puts ">>>>>>>>>>>>>>> create"
    order_params
    # orderEntity = {
    #   products: order_params["products"]
    # }

    # @orderRepository.add(orderEntity: orderEntity)

=begin
    @order = Order.new(order_params)

    if @order.save
      render json: @order, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
=end
  end

  # PATCH/PUT /orders/1
  def update
    if @order.update(order_params)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    @order.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def order_params
      params.require(:order).permit(:number, :date, {products: [:name, :price]})
    end
end
