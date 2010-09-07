class ItemsController < ApplicationController
  def index
    render :text => 'Index'
  end
  
  def new
    render :text => 'New'
  end
  
end
