# MVP

- BASIC layout for "settings" page
- have some images somewhere?
- add a page footer with useful links
- hardcoded profile in 11ty template
  - links, email address, 88x31s, blogroll?
- make secrets setting submit show whether it succeeded or failed
- make post interface show whether it succeeded or failed and clear the form
- validate post fields
  - use tag JS / form field from postmarks tags
- validate secret fields
- make PWA-ready so it can be on the home screen

# SOMEDAY

- use GitHub API to fetch Octokit repo basics, indicate that all secrets have been configured correctly & site is operational for posting
- use GitHub API to fetch Actions build status, update page & redirect when site has been updated
- delete post from web interface
  - customize eleventy to check localstorage
  - if it exists embed buttons in forms that POST to github API
- edit post from web interface
  - customize eleventy to check localstorage
  - if it exists redirect to posting interface
  - include some parameters that cause the interface to fetch the post's content from GitHub and pre-populate the posting form fields
  - pre-populate the path field with the existing timestamped filename
- support for drafting posts
  - draft option in posting interface
  - enhance octobug static web app to fetch drafts from repo & edit/post them
- tighten up posting interface styling
- use [cohost web component](https://cohost-web-component.meow.garden/) for post rendering?
- maybe store posts in better structure instead of a big pile of unix timestamps in the `content` subdirectory?
- media upload to S3-like storage (just inserts the correct markup into the post field like Github's drag-and-drop)
- web interface for setting "profile" fields (display name, bio, avatar?)
  - show current display name on page in profile section
  - but maybe also bind display name to posts at time of posting?
- document & open-source for other people
  - figure out how to not make everyone create their own GitHub app; auth via OAuth instead of using private key + installation ID

# DREAMSCAPE

- some kind of lightweight redis(?)-like "likes" feed.
  - localstorage-powered eleventy page menu to send me your name when you hit like
- multi-author support? (how to verify?)
