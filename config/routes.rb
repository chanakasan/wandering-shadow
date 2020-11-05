Rails.application.routes.draw do
  scope :api do
    resources :blog_posts
  end
end
