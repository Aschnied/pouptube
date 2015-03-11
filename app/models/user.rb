require 'bcrypt'


class User < ActiveRecord::Base
  has_many :links

  include BCrypt

  validates :username, uniqueness: true, presence: true

  def password
    @password ||= BCrypt::Password.new(password_hash)
  end

  def password=(new_password)
    @password = BCrypt::Password.create(new_password)
    self.password_hash = @password
  end

  def self.authenticate_by_username(username, password)
    user = User.find_by(username:username)
    (user && user.password == password) ? user : false
  end


  def self.authenticate_by_username(username, password)
    user = User.find_by(username:username)
    (user && user.password == password) ? user : false
  end

  def authenticate(password)
    self.password == password
  end

end
