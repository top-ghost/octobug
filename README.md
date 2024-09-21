# Octobug

> [!WARNING]
> This project and its README are not currently very accessible-- I'm writing with a baseline assumption of proficiency with things like Git, GitHub, Eleventy, and probably some other things. If people are actually interested in the project, we'll make it better with time. Thanks for your patience and/or help!

## Github repo setup

1. At the top of this repo, click on the "Use this template" dropdown and choose "Create a new repository". Give the repo a name and make note of the resulting HTTPS URL: it should look something like `https://github.com/${your username}/${the repo name}`. You'll be collecting more things in your notes to go along with this.

## GitHub app setup

1. Go to Settings -> at the bottom, select "Developer settings".
2. Click on "New GitHub App" in the top right corner.
3. Give it a name and URL (these don't really matter, but you'll need to find it by name later). Generate the app.
4. on the app's "General" page (you should have been sent there after the app was created),
   make note of the "App ID" near the top of the page in the same place you stored the repo URL.
5. scroll down to "Private keys" and hit "Generate a private key". It will download a .pem file. Put that somewhere you won't lose it.
6. CLick on "Permissions & events" in the left sidebar. Scroll down to "Contents" and choose "Access: Read and write". Scroll all the way down and hit Save.
7. Click on "Install App" in the left sidebar. Choose your account. You should now be on an "installation" page, with a URL like "/settings/installations/${a number}". Make note of the number where you recorded the other secrets; this is your "Installation ID".
8. On the installation page, you can choose under "Repository access" to give it access to just the repo you set up for this purpose. Hit "Save".

## Private Key preparation

Github provides your App's Private Key as a PKCS#1 format .pem file.
To authenticate with their REST API, they require your private key as a string in PKCS#8 format. So that's cool.

For now you'll need access to a Linux or macOS command line to do this next step; hopefully we can streamline this process eventually and make it accessible for (non-WSL) Windows users, but for now run:

```
openssl pkcs8 -topk8 -inform PEM -outform PEM -in filename -out filename -nocrypt | awk 1 ORS='\\n'
```

if you're on macOS you can add ` | pbcopy` at the end to copy the result to your clipboard, otherwise do it manually and save that in the same place you saved the App ID and Installation ID earlier. At this point you should have your App ID, your Installation ID, your Private Key, and your Github repo URL in your notes.

## Github Pages setup

Go to your repo's Settings page and in the left sidebar click on "Pages" under "Code and automation". Select "Deploy from a branch" under "Source", then under "Branch" select `gh-pages` in the dropdown. `/ (root)` should be fine for the directory. Hit "Save".

> [!NOTE]
> If you don't see that branch listed, the Github Action probably didn't run correctly after you cloned the repo. Go to the repo's Actions tab, find the most recent `Eleventy Build` run, and look for errors. (Hopefully there will be more assistance for you eventually! Sorry!)

at this point Github should start running a Github Pages deploy; if it succeeds it should show you the deployed `github.io` URL. If you're happy with how it looks you can follow GitHub's guidelines for adding a custom domain to your site, or else you can just use the provided subdomain/directory.

> [!IMPORTANT]
> If you're not planning on setting up a custom domain, that means your site will live in a subdirectory of your GitHub account's `github.io` subdomain. Eleventy by default assumes that sites using it will be at the root of the domain; to fix this you will need to edit the `eleventy.config.js` file, find the line near the bottom that reads `pathPrefix: '/'`, and update it to read `pathPrefix: '/your-repo-name/'` (the beginning and ending slashes are both required!).

## Posting

1. To post, start by adding `/octobug` to the URL of your site and bookmark that page.
2. You need to configure the API credentials-- this is where the notes you took earlier come in. Enter values for all of the authentication fields based on what you recorded above and hit "Update". This will store the values in your browser's local storage on that subdomain-- this means:
   a. you'll have to re-enter these values any time you want to post from a new device or if you clear local storage for this subdomain/domain for any reason
   b. you can post to different blogs without having to log out / back in!
3. You can also set a post author name. This is mostly a hack right now; I'm hoping to support multiple authors on a single blog at some point and that metadata will theoretically be set via some kind of split credential or come via the git metadata or something like that. But for now you can impersonate whoever you want, create multiple identities, etc.
4. Once the stuff in the Secrets form has been set up successfully (right now you need to verify that by making a post, but there will be some kind of visual indication on the page in the future), you're ready to start posting! You can ignore the Secrets form and just use the Post form.
5. For now, if you need to edit or delete a post, you can do that from the GitHub repo's web interface. It works okay! We'll add a way to do it on the site itself eventually.

## Now do Eleventy things

Octobug will eventually provide a light customization of the `eleventy-base-blog` template to more closely match the Cohost profile experience but you can do whatever you want at this point to work with your repo as you would any Eleventy app.

You can even post manually, if you want more control over the post or if you want to include media while we're not yet supporting that in the web interface. Just add files to the `content` directory the way you would a regular Eleventy app. When you push to the repo you should still get a full Eleventy build sent to the gh-pages branch, and GitHub should publish that to your GitHub Pages hosted site.

While you're experimenting, since it's just a static Eleventy site, you can make use of a node.js-ready development environment to run `npx @11ty/eleventy --serve` and see your changes locally. Then push your changes back to your GitHub repo to publish it to your site.

Change things in the eleventy.config.js file! Add plugins in package.json! Update the templates and default page structures in `_includes` and `content`! The world is your oyster. You'll need to make sure that the contents of `/public/octobug` pass through to your built site in order to post from the web, obviously, but you can even customize those files in order to change the posting interface to your heart's content to include additional post metadata fields that you then can make use of in your 11ty layouts.

Think you might have an improvement to the posting interface that would be widely applicable? Fork this project (a clean copy, not your template with your own `/content` folder) and let people use your version as a template, or send patches upstream (though I can offer no guarantees on how regularly I will be able to respond to these!)
