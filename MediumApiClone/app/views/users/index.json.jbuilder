json.array!(@users) do |user|
  json.extract! user, :id, :first, :last, :email, :password, :auth_token
  json.url user_url(user, format: :json)
end
