set :stage, :production
set :branch, 'master'

server 'cpt-styles.digiman.us', user: 'cpt', roles: %w{web app}

 set :ssh_options, {
   keys: %w(~/.ssh/staging.pem),
   forward_agent: true,
   auth_methods: %w(publickey password)
 }