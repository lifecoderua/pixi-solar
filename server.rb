## this one required for the assets loader on localhost
require 'sinatra'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end