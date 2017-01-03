class CreatePads < ActiveRecord::Migration[5.0]
  def change
    create_table :pads do |t|
      t.string :hash
      t.text :data
      t.timestamps
    end
  end
end
