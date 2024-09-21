import { createAppAuth } from "https://esm.sh/@octokit/auth-app";
import { Octokit } from "https://esm.sh/@octokit/core";

window.octokit = null;
window.currentPost = {};

function authorize() {
  const privateKey = localStorage.getItem("githubPrivateKey");

  if (!!privateKey) {
    try {
      window.octokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
          appId: localStorage.getItem("githubAppId"),
          privateKey: localStorage.getItem("githubPrivateKey"),
          installationId: localStorage.getItem("githubAppInstallationId")
        },
      });

      console.log(`done: ${JSON.stringify(octokit)}`);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }
}

function makePost(postAuthor, {postTitle, postTimestamp, postBody, postTagsRawString}) {
  const tagArray = postTagsRawString.split(',').map((t) => t.trim());

  return `---json
${JSON.stringify({
  author: postAuthor,
  date: "Git created",
  title: postTitle,
  timestamp: postTimestamp,
  tags: tagArray,
  layout: "layouts/post.njk"
})}
---
${postBody}
`;
}

window.addEventListener("DOMContentLoaded", async () => {
  authorize();

  const postButton = document.getElementById("postButton");
  const postTitleInput = document.getElementById("postTitle");
  const postBodyTextarea = document.getElementById("postBody");
  const postTagsRawInput = document.getElementById("postTagsRaw");

  postButton.addEventListener("click", async (e) => {
    e.preventDefault();

    window.currentPost = {
      postTitle: postTitleInput.value,
      postTimestamp: Date.now(),
      postBody: postBodyTextarea.value,
      postTagsRawString: postTagsRawInput.value
    }

    const eleventyFormattedPost = makePost(localStorage.getItem("postAuthor"), window.currentPost);

    if (octokit) {

      try {
        const response = await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
          owner: localStorage.getItem("githubRepoOwner"),
          repo: localStorage.getItem("githubRepoName"),
          path: `content/${Date.now().toString()}.md`,
          message: "post created with octobug",
          content: window.btoa(eleventyFormattedPost),
          branch: "main"
        });

        console.log(response);
      } catch (error) {
        console.log(`error: ${error.message}`);
      }
    } else {
      console.log("API not initialized");
    }
  });


  window.secretInputs = {};
  window.secretFields = ['githubPrivateKey', 'githubAppId', 'githubAppInstallationId', 'githubRepoUrl', 'postAuthor']
  
  window.secretFields.forEach((fieldName) => {
    window.secretInputs[fieldName] = document.getElementById(`${fieldName}Input`);
  })
  
  const secretsUpdate = document.getElementById("secretsUpdateButton")

  secretsUpdate.addEventListener("click", async (e) => {
    e.preventDefault();

    window.secretFields.forEach((fieldName) => {
      switch (fieldName) {
        case 'githubRepoUrl':
          const [_, githubRepoOwner, githubRepoName] = window.secretInputs['githubRepoUrl']?.value?.match(/^https?\:\/\/github\.com\/([^\/]+)\/(.+)$/)
          localStorage.setItem('githubRepoOwner', githubRepoOwner);
          localStorage.setItem('githubRepoName', githubRepoName);
          break;
        default:
          localStorage.setItem(fieldName, window.secretInputs[fieldName]?.value);
      }
      
    })

    authorize();
  });
});
