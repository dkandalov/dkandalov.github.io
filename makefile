# Based on https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll
# Needs Ruby 3.3 (see https://github.com/github/pages-gem/blob/master/.ruby-version)
run:
	bundle exec jekyll serve

setup:
	gem install bundler && bundle install

update:
	bundle update
