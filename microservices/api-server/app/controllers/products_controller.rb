class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  include MessageBrokerClient

  rescue_from ActionController::ParameterMissing, with: :bad_request_response
  rescue_from ActionController::UnpermittedParameters, with: :bad_request_response

  # GET /products
  def index
    @products = Product.all

    render json: @products
  end

  # GET /products/1
  def show
    render json: @product
  end

  # POST /products
  def create
    productParam = product_params

    payload = {
      event: "create",
      component: "product",
      data: productParam
    }

    MessageBrokerClient::Topics::PlatformEventsScheduler.instance.publish(payload: payload)

    render json: {}, status: :accepted
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy
  end

  private
    def product_params
      params.require(:data).permit(:name, :price)
    end
  
    def bad_request_response
      render :nothing => true, :status => :bad_request
    end
end
