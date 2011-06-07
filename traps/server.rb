require 'rubygems'
require 'sinatra'

enable :sessions

get '/' do
  %w(js_visited js_valid index_visited).each {|k| session[k] = false}
  @js_rand = rand
  @css_rand = rand
  session['js_rand'] = @js_rand
  session['index_visited'] = true
  erb :index
end

get '/favicon.ico' do
  status 404
end

get '/css/main.css' do
  "* {padding:0;margin:0;}"
end

get '/js/main.js' do
  session['js_visited'] = true
  if session['js_rand'].to_s == params['pack'].to_s
    session['js_valid'] = true
  end
  "
    function test()
    {
      alert('Test!');
    }
  "
end

post '/test' do
  @rate = 0
  %w(js_visited js_valid index_visited).each do |k|
    if session[k] == true
      @rate += 1
    end
  end
  if params.include? 'submit'
    @rate += 1
  end
  "Your human rate is #{@rate}"
end

