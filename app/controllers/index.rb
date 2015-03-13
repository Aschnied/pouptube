get '/' do
  @login_user = User.new
  @register_user = User.new
  erb :index
end

get '/users/:username' do
  @all_links = Link.all.reverse

  @user = User.find_by(username: params[:username])
    if @user
      @links = @user.links

      erb :user
    else
      "Noop"
    end
end

post '/login'  do
  @register_user = User.new
  @login_user = User.where(username: params[:username]).first
  if @login_user && @login_user.authenticate(params[:password])
    login_user(@login_user)
    redirect "/users/#{@login_user.username}"
  else
    if !@login_user # username is bad
      @login_user = User.new
      @login_user.errors.add('username', 'not found')
    end
    erb :index
  end
end

post '/register' do
  @login_user = User.new
  @register_user = User.new(username: params[:username], password: params[:password])
  if @register_user.save
    login_user(@register_user)
    redirect "/users/#{@register_user.username}"
  else
    erb :index
  end
end

post '/logout' do
  logout_user

  redirect '/'

end

post '/username/links' do
  current_id = session[:user_id]
  new_url = Link.create(url: params[:url], user_id:current_id)
  new_url.to_json


end