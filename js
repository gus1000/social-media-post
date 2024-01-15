console.clear();

import { faker } from "https://cdn.skypack.dev/@faker-js/faker";
const posterContainer = document.querySelector(".poster-container");
const postContainer = document.querySelector(".post-container");

const posts = document.querySelector(".posts");

function createElement(type, data = "") {
  const element = document.createElement(type);
  element.innerText = data;
  return element;
}
const viewCommentsButton = createElement("button", "view comments");
posts.appendChild(viewCommentsButton);

function createReply() {
  const reply = {
    replyID: Math.floor(Math.random() * 20),
    userName: faker.internet.userName() + " ",
    text: faker.lorem.lines(2),
    imageURL: faker.image.url(),
    createdAt: faker.date
      .past()
      .toString()
      .split(" ")
      .splice(1, 3)
      .toString(",")
      .replace(",", " ")
  };
  return reply;
}

function createPostwithReplies() {
  const numberOfReplies = Math.floor(Math.random() * 3);
  const post = {
    id: Math.floor(Math.random() * 20),
    userName: faker.internet.userName() + " ",
    text: faker.lorem.lines(2),
    imageURL: faker.image.url(),
    createdAt: faker.date
      .past()
      .toString()
      .split(" ")
      .splice(1, 3)
      .toString(",")
      .replace(",", " "),
    replies: []
  };

  for (let i = 0; i < numberOfReplies; i++) {
    const reply = createReply();
    post.replies.push(reply);
  }

  return post;
}

// let posts = []; //check later

function generatePostData() {
  const posts = [];
  const numberOfPosts = 4;

  for (let i = 0; i < numberOfPosts; i++) {
    const post = createPostwithReplies();
    posts.push(post);
  }
  return posts;
}

const data = generatePostData();

function renderPost(data) {
  console.log(data.length);

  data.forEach(function (comment) {
    viewCommentsButton.addEventListener("click", function () {
      if (posts.innerHTML.length > 0) {
        posts.innerHTML = ``;
      } else {
        console.log(comment);
        const { userName, text, imageURL, createdAt, replies } = comment;
        const li = createElement("li");

        const profile = createElement("div");

        const image = createElement("img");
        image.classList.add("profile-picture"); /////
        image.src = imageURL;
        image.classList.add("space");

        const postInfo = createElement("div");

        const user = createElement("span", userName);
        user.classList.add("space");

        const dateCreated = createElement("span", createdAt);
        const dateText = createElement("span", text);

        dateText.classList.add("lower-margin");

        postInfo.appendChild(image);

        postInfo.appendChild(user);
        postInfo.appendChild(dateCreated);
        postInfo.classList.add("post-info");

        profile.appendChild(dateText);
        profile.classList.add("lower-margin");
        li.appendChild(postInfo);

        li.appendChild(profile);

        const replyList = createElement("ul");
        replyList.classList.add("lower-margin");

        const viewRepliesButton = createElement("button", "view replies");
        profile.appendChild(replyList);
        li.appendChild(profile);
        li.appendChild(viewRepliesButton);

        viewRepliesButton.addEventListener("click", function () {
          if (replyList.innerHTML.length > 0) {
            replyList.innerHTML = ``;
          } else {
            replies.forEach(function (reply) {
              const { userName, text, imageURL, createdAt } = reply;

              const li = createElement("li");
              // li.classList.add("user-container");

              const profile = createElement("div");
              // profile.classList.add("user-container");
              const postInfo = createElement("div");

              const image = createElement("img");
              image.classList.add("profile-picture");
              image.src = imageURL;
              image.classList.add("space");

              const user = createElement("span", userName);
              const dateCreated = createElement("span", createdAt);
              user.classList.add("space");
              const dateText = createElement("span", text);
              // dateText.classList.add("lower-margin");
              postInfo.appendChild(image);
              postInfo.classList.add("post-info");
              postInfo.classList.add("lower-margin");

              postInfo.appendChild(user);
              postInfo.appendChild(dateCreated);
              profile.appendChild(dateText);

              li.classList.add("upper-margin");

              ////////////////////////////////
              li.appendChild(postInfo);

              li.appendChild(profile);

              replyList.appendChild(li);
            });
          }
        });

        posts.appendChild(li);
      }
    });
  });
}

renderPost(data);
