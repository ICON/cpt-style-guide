set :stage, :deploy
set :branch, 'deploy'

server '107.170.221.83', user: 'cpt', roles: %w{web app}

 set :ssh_options, {
#   keys: %w(~/.ssh/production.pem),
   forward_agent: true,
   auth_methods: %w(publickey password)
 }