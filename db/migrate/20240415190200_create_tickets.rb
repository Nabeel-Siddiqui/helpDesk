class CreateTickets < ActiveRecord::Migration[7.1]
  def change
    create_table :tickets do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.text :description, null: false
      t.text :response
      t.boolean :resolved
      t.string :status

      t.timestamps
    end
  end
end
