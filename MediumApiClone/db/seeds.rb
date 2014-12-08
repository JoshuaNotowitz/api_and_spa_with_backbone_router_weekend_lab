# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
	josh = User.create({first:"abc", last:"abc", email:"abc", password:"abc"})

	post = Post.create({title:"cba", content:"cba" })

	josh.posts << post

