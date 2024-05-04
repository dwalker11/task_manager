# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
user = User.create(name: "Devon", email: "devon@example.com")

user.tasks.create([
    { name: "Wash car", description: "Go to the car wash", completed: false },
    { name: "Sign up for course", description: "Sign up for the Motorcycles Safety Course", completed: false },
    { name: "Submit assesment", description: "Submit the Savvy Test assesment", completed: true },
])
