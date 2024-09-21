# NOW

- get github action publishing to github pages
- get public/octobug files copied into eleventy build
- test out publishing from the deployed github page
- move DNS for domain over to start propagation ASAP
- move secrets setting stuff into separate page linked from post page
- validate post fields
- validate secret fields

# MVP

- display name + author name + swatch beats timestamp on all posts
- full post setup working from any web browser to topposts.net
- blog layout with paginated full-post feed, tag pages with paginated full-post feeds
- BASIC layout for "settings" overlay
- BASIC layout for "post" overlay
- working image / audio / video posts if written by hand in VSCode similar to motd
- bring over markdown config (single linebreak) + plugins (embeds for youtube URLs, tweets, etc) from motd config
- rss/atom/json feeds working the way you'd want them to
- delete post from web interface
- edit post from web interface
- drafts (localstorage only?)

# SOMEDAY

- tighten up posting interface
- web interface for setting "profile" fields (display name, bio, avatar?)
- some kind of lightweight redis-like "likes" feed. localstorage hack to send me your name when you hit like
- document & open-source for other people
- image upload to S3-like storage (just inserts the correct markup into the post field like Github's drag-and-drop)
- audio upload to S3-like storage
- multi-author support? (how to verify yaml frontmatter?)
