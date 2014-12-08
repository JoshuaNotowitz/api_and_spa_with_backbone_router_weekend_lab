Rails.application.routes.draw do
  resources :posts, except: [:new, :edit], constraints: { subdomain: "api"}

  resources :users, except: [:new, :edit], constraints: { subdomain: "api"}

    post '/login' => 'users#attempt_login', constraints: { subdomain: "api"}, as: :login

end
