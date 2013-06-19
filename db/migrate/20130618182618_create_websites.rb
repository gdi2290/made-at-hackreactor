class CreateWebsites < ActiveRecord::Migration
  def change
    create_table :websites do |t|
      t.string :name
      t.string :image
      t.string :url
      t.string :team
      t.integer :views
      t.string :share
      t.string :social
      t.text :content

      t.timestamps
    end
  end
end
