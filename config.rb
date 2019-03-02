###
# Variables
###

set :css_dir, 'stylesheets'
set :js_dir, 'js'
set :images_dir, 'img'
set :markdown, :layout_engine => :erb, :tables => true, :autolink => true, :smartypants => true


# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Use the .env file for configuration options
activate :dotenv

# Use pretty URLs
activate :directory_indexes

# Contenful integration
activate :contentful do |f|
  f.space         = { phillydayhiker: 'sib29204iua7'}
  f.access_token  = ENV['CONTENTFUL_API']
# f.use_preview_api = true
  f.all_entries   = true
  f.cda_query     = { include: 3 }
  f.content_types = { destinations: 'destination'}
end


###
# Page options, layouts, aliases and proxies
###

###
# Environment configurations
###

configure :development do
  activate :livereload
end

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :relative_assets
end