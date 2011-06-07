ActionController::Routing::Routes.draw do |map| 

  map.catch_all "*anything/new", :controller => "items", :action => "new"
  map.catch_all "*anything", :controller => "items", :action => "index"
  

end
