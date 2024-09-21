# NOW

- move DNS for domain over to start propagation ASAP
- move secrets setting stuff into separate page linked from post page
- make secrets setting submit show whether it succeeded or failed
- make post interface show whether it succeeded or failed
- validate post fields
- validate secret fields

# MVP

- display name + author name + swatch beats timestamp on all posts
- full post setup working from any web browser to topposts.net
- customize base eleventy config to use correct fields from json frontmatter
- customize base eleventy layout with paginated full-post feed, tag pages with paginated full-post feeds
- BASIC layout for "settings" overlay
- BASIC layout for "post" overlay
- bring over markdown config (single linebreak) + plugins (embeds for youtube URLs, tweets, etc) from motd config
- rss/atom/json feeds working the way you'd want them to
- delete post from web interface
  - customize eleventy to check localstorage
  - if it exists embed buttons in forms that POST to github API
- edit post from web interface
  - customize eleventy to check localstorage
  - if it exists redirect to posting interface
  - include some parameters that cause the interface to fetch the post's content from GitHub and pre-populate the posting form fields
  - pre-populate the path field with the existing timestamped filename
- drafts (localstorage only?)

# SOMEDAY

- tighten up posting interface
- maybe store posts in better structure instead of a big pile of unix timestamps in the `content` subdirectory?
- web interface for setting "profile" fields (display name, bio, avatar?)
- some kind of lightweight redis-like "likes" feed.
  - localstorage-powered eleventy page menu to send me your name when you hit like
- document & open-source for other people
  - figure out how to not make everyone create their own GitHub app; auth via OAuth instead of using private key + installation ID
- image upload to S3-like storage (just inserts the correct markup into the post field like Github's drag-and-drop)
- audio upload to S3-like storage
- multi-author support? (how to verify?)
