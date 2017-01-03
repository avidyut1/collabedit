require 'securerandom'
class Pad < ApplicationRecord

  before_create :generate_hash

  def generate_hash
    random_string = SecureRandom.hex
    while Pad.where(:hash_id => random_string).first
      random_string = SecureRandom.hex
    end
    self.hash_id = random_string
  end

end
