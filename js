console.clear();

import { faker } from "https://cdn.skypack.dev/@faker-js/faker";
const postContainer = document.querySelector(".post-container");
const posts = document.querySelector(".posts");

function createElement(type, data = "") {
  const element = document.createElement(type);
  element.innerText = data;
  return element;
}

function createReply() {
  const reply = {
    replyID: Math.floor(Math.random() * 20),
    userName: faker.internet.userName(),
    text: faker.lorem.lines(1),
    imageURL: faker.image.url(),
    createdAt: faker.date.past()
  };
  return reply;
}

function createPostwithReplies() {
  const numberOfReplies = Math.floor(Math.random() * 3);
  const post = {
    id: Math.floor(Math.random() * 20),
    userName: faker.internet.userName(),
    text: faker.lorem.lines(1),
    imageURL: faker.image.url(),
    createdAt: faker.date.past(),
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

function createPost() {
  const data = generatePostData();

  const ul = createElement("ul");
  const postLength = generatePostData().length;

  for (let j = 0; j < postLength; j++) {
    const { userName, text, imageURL, createdAt, replies } = data[j];

    renderPost(userName, text, imageURL, createdAt, replies);
  }
}

createPost();

function renderPost(userName, text, imageURL, createdAt, replies) {
  const li = createElement("li");

  // posts.appendChild(li);

  // const id = createElement("h5", id);

  const profileContainer = createElement("div");
  const user = createElement("h5");

  const span = createElement("span");

  const image = createElement("img");
  image.classList.add("profile-picture"); /////
  image.src = imageURL;
  user.appendChild(image);
  const userNameText = document.createTextNode(userName);
  span.appendChild(userNameText);
  user.appendChild(span);

  profileContainer.appendChild(user);

  const comment = createElement("p", text);

  const dateCreated = createElement("h5", createdAt);

  const replyList = createElement("ul");

  replies.forEach(function (reply) {
    const { userName, text, imageURL, createdAt } = reply;

    const replyLi = createElement("li");

    const profileContainer = createElement("div"); /////

    const user = createElement("h5");

    const span = createElement("span");

    const image = createElement("img");
    image.classList.add("profile-picture");
    image.src = imageURL;
    user.appendChild(image);
    const userNameText = document.createTextNode(userName);
    span.appendChild(userNameText);
    user.appendChild(span);
    
    
    ////////////////////////////////

    profileContainer.appendChild(user);

    const comment = createElement("p", text);

    const dateCreated = createElement("h5", createdAt);

    replyLi.appendChild(profileContainer);

    replyLi.appendChild(comment);
    replyLi.appendChild(dateCreated);
    replyList.appendChild(replyLi);
  });

  profileContainer.appendChild(user);

  li.appendChild(profileContainer);

  li.appendChild(comment);
  li.appendChild(dateCreated);
  li.appendChild(replyList);

  posts.appendChild(li);
}
