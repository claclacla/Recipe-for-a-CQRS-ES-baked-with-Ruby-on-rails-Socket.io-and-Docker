class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :update, :destroy]

  include Repositories::Mongoid

  rescue_from ActionController::ParameterMissing, with: :bad_request_response
  rescue_from ActionController::UnpermittedParameters, with: :bad_request_response

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
    orderParam = order_params

    render :nothing => true, status: :accepted
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
    #def set_order
    #  @order = Order.find(params[:id])
    #end

    # Only allow a trusted parameter "white list" through.
    def order_params
      params.require(:order).permit(:products => [:uid, :amount])
    end

    def bad_request_response
      render :nothing => true, :status => :bad_request
    end
end
