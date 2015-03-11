helpers do
  def current_user
    session[:user_id] ? User.find(session[:user_id]) : nil
  end

  def login_user(user)
    session[:user_id] = user.id
  end

  def logged_in?
    !current_user.nil?
  end

  def logout_user
    session.delete(:user_id)
  end
end