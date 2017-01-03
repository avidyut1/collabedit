class RenameColumnHash < ActiveRecord::Migration[5.0]
  def change
    rename_column :pads, :hash, :hash_id
  end
end
