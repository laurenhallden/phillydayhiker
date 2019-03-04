###
# Variables
###

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :markdown, :layout_engine => :erb, :tables => true, :autolink => true, :smartypants => true

###
# Helpers
###
helpers do

  def get_destinations
    destinations = { }
    data.phillydayhiker.destinations
      .sort_by { |id, c| c.name }
      .each do |id, c|
        destinations[id] = c
    end
    destinations
  end
end

activate :syntax

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

page "/sitemap.xml", :layout => false

if data.respond_to?('phillydayhiker')
  # Build individual integration pages
  data.phillydayhiker.destinations.each do |id, destination|
    proxy "destinations/#{destination['slug']}/index.html", "destination.html", locals: { destination: destination }, :ignore => true
  end
end

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
  activate :robots,
    :rules => [
      {
        :user_agent => '*',
        :disallow =>  %w(/copies/)
      }
    ],
  :sitemap => "https://phillydayhiker.com/sitemap.xml"

  after_build do |builder|
    # Netlify requires a _redirects file for its redirects, but Middleman ignores files which
    # start with an underscore! So we have to hack it a little.

    # This code moves the _redirects file from the top level project folder into the build folder.
    # Middleman cleans (deletes) the entire build folder by default each build so this is required
    # to keep the redirects around and make sure they get into the folder for netlify to use.
    src = '_redirects'
    dst = File.join(config[:build_dir],"_redirects")
    builder.source_paths << File.dirname(__FILE__)
    builder.copy_file(src,dst)

  end
end
