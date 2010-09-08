class Comment < ActiveRecord::Base
  
  default_scope :order => 'created_at ASC'
  
  belongs_to :post
  after_create :send_notify
  
  def send_notify
    content = ActionView::Base.new(Rails::Configuration.new.view_path).render(:partial => 'comments/comment', :locals => {:comment => self})
    Red.publish("example:posts:#{post.id}", content)
  end
  
end
