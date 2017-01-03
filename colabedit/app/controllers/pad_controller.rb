class PadController < ApplicationController
  def create
    p = Pad.new
    if p.save
      render json: {result: 'success', hash: p.hash_id}
    else
      render json: {result: 'error'}
    end
  end
end
