console.clear();

import { faker } from "https://cdn.skypack.dev/@faker-js/faker";
const container = document.querySelector(".container");
const profileImage = document.querySelector(".image");
const card = document.querySelector(".card");

const posterContainer = document.querySelector(".poster-container");
const postContainer = document.querySelector(".post-container");
const heartButton = document.querySelector(".heart-button");
const postButtonsContainer = document.querySelector(".post-buttons-container");
const postStatsContainer = document.querySelector(".post-stats-container");
const currentDate = document.querySelector(".current-date");
const closeButton = document.querySelector(".close-button");

const posts = document.querySelector(".posts");

function createElement(type, data = "") {
  const element = document.createElement(type);
  element.innerText = data;
  return element;
}
const viewCommentsButton = createElement("button", "view comments");
posterContainer.appendChild(viewCommentsButton);

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
  const numberOfReplies = Math.floor(Math.random() * 3) + 1;
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
  // const viewCommentsButton = createElement("button", "view comments");
  // posts.appendChild(viewCommentsButton);
  // console.log(viewCommentsButton.innerHTML.length);
  // console.log(posts.innerHTML.length);

  viewCommentsButton.addEventListener("click", function () {
    if (posts.innerHTML.length > 0) {
      posts.innerHTML = ``;
    } else {
      data.forEach(function (comment) {
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
      });
    }
  });
}

renderPost(data);

heartButton.addEventListener("click", function () {
  const likes = data.map(function (person) {
    return person.userName;
  });

  postStatsContainer.innerHTML = `<h5> ${likes[0]} and ${
    likes.length - 1
  } <span><button class="others">others</button></span> like this</h5>`;
  const others = document.querySelector(".others");
  postStatsContainer.classList.add("post-stats-container");
  others.addEventListener("click", function () {
    data.forEach(function (person) {
      const personContainer = createElement("div");
      const image = createElement("img");
      image.src = person.imageURL;
      image.classList.add("profile-image");
      const userName = createElement("h5", person.userName);
      userName.classList.add("username");

      const followButton = createElement("button", "follow");
      personContainer.appendChild(image);
      personContainer.appendChild(userName);

      personContainer.appendChild(followButton);
      personContainer.classList.add("person-container");
      card.appendChild(personContainer);
    });
    card.classList.toggle("hidden");
    closeButton.addEventListener("click", function () {
      card.classList.toggle("card");
            // card.classList.toggle("hidden");

    });
  });
});

// // others.addEventListener("click", function () {
//     data.forEach(function (person) {
//       cards.innerHTML += `<div class="poster-container">

//     <img class="profile-picture" src=${person.imageURL} alt="">
//     <span class="poster"> ${person.userName} <p class ="name">Jonas</p></span>

//     <button class="follow-button">Follow</button>
//   </div> `;
