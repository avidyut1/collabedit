class PadController < ApplicationController
  def show
    hash_id = params[:id]
    p = Pad.where(:hash_id => hash_id)
    if p.size == 1
      p = p.first
      render json: p
    else
      render json: {result: 'error'}
    end
  end
  def create
    p = Pad.new
    if p.save
      render json: {result: 'success', hash: p.hash_id}
    else
      render json: {result: 'error'}
    end
  end
end
