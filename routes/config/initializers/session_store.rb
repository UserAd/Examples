# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_routes_session',
  :secret      => '37bfb0d5e7ba96f55b08d69579372a72609255ebaae2409b977efea90b7601558292e00a2f1f4e553e3578ed096517ee0312be7a7dab5af5f0550fc338397624'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
