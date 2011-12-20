require 'rubygems'
require 'rack'

class HelloWorld
  def call(env)
    [200, {"Content-Type" => "text/plain"}, ["Apparently no static file here."]]
  end
end

# Run in this directory, the files in this project should get served (for example: http://localhost:9292/Rakefile).
use Rack::Static, :urls => ['/']

run HelloWorld.new
