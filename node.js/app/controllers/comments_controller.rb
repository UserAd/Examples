class CommentsController < ApplicationController
  def create
    post = Post.find(params[:post_id])
    comment = Comment.new params[:comment]
    post.comments << comment
    render :text => 'OK'
  end
end
