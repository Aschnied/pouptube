get '/' do
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
  @user=User.authenticate_by_username(params[:username], params[:password])
  if (@user||= User.authenticate_by_email(params[:username], params[:password]))
    login_user(@user)
    redirect "/users/#{@user.username}"
  else
    redirect '/'
  end
end

post '/register' do
  @user = User.new(username: params[:username], email: params[:email], password: params[:password])
  if @user.save
    login_user(@user)
    redirect "/users/#{@user.username}"
  else
    redirect '/'
  end
end

post '/logout' do
  logout_user

  # debugger

  redirect '/'

end

post '/API/dataparser' do

end