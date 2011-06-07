# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_node.js_session',
  :secret      => '7102f4ba01a81689cad4f7433701a4ffa5db38d6a2ea283be22306b53d0c6f97507d35a5d7bef633c8c821b691b9463cf95a25d482d8e108559bb34255b2b33b'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
