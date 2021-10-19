let postList = [];

/* Load Published Posts */
window.onload = function displayPostList() {  
  /* Get Post from LS */
  storedList = localStorage.getItem("localPostList");
  if (storedList == null) {
    postList = [];
  } else {
    postList = JSON.parse(storedList);
  }
  /* Render Post List */
  for (index = 0; index < postList.length; index++) {
    /* Post Structure */
    html = `<div class="module" style="margin: 2%">
    <div class="content">
    <div class="post-top" style="justify-content: left">
    <img src="./Images/Profile.jpg" class="profile-img">
    <div style="display: flex; flex-direction: column; width: 80%">
        <h5>${postList[index].name}</h5>
        <p>${postList[index].date}</p>
        <p>${postList[index].time}</p>
    </div>
    <button id="deletePostBtn" onclick="deletePost(${postList[index]._id})">
    <img src="./Images/icons/trash-icon.png" class="icon">
    </button>
</div>
<div class="post-bottom" style="justify-content: left">
    <p>${postList[index].post}</p>
</div>
    </div>
              
          </div>`;
    /* To HTML */
    document.getElementById("feed-container").innerHTML += html;
    /* Publications Counter */
    document.getElementById("publications").innerHTML = postList.length; 
    
  }

  for (index = 0; index < 5; index++) {
    /* Post Structure */
    html = `<div class="module" style="margin: 2%">
    <div class="content">
    <div class="post-top" style="justify-content: left">
    <img src="./Images/Profile.jpg" class="profile-img">
    <div style="display: flex; flex-direction: column; width: 80%">
        <h5>${postList[index].name}</h5>
        <p>${postList[index].date}</p>
    </div>
</div>
<div class="post-bottom miniPost" style="justify-content: left">
    <p>${postList[index].post}</p>
</div>
    </div>
              
          </div>`;
    /* To HTML */
    document.getElementById("trending").innerHTML += html;

    document.getElementById("myPosts").innerHTML += html;
  }


};

render(postList);
/* Render Post List */
function render(postList) {
  /* Render Post List */
  for (index = 0; index < postList.length; index++) {
    /* Post Structure */
    html = `<div class="module" style="margin: 2%">
              <div class="content">
              <div class="post-top" style="justify-content: left">
              <img src="./Images/Profile.jpg" class="profile-img">
              <div style="display: flex; flex-direction: column; width: 80%">
                  <h5>${postList[index].name}</h5>
                  <p>${postList[index].date}</p>
                  <p>${postList[index].time}</p>
              </div>
              <button id="deletePostBtn" onclick="deletePost(${postList[index]._id})">
                  <img src="./Images/icons/trash-icon.png" style="width: 7%;">
              </button>
          </div>
          <div class="post-top" style="justify-content: left">
              <p>${postList[index].post}</p>
          </div>
              </div>
                        
                    </div>`;
    /* To HTML */
    document.getElementById("feed-container").innerHTML += html;
  }
}

function sortAsc() {
  /* Get List from LS */
  let postList = localStorage.getItem("localPostList");
  /* JSON Parse */
  let postListJSON = JSON.parse(postList);
  /* Sort List */
  let postListSort = postListJSON.sort((a, b) => {
    if (a.time > b.time) return 1;
    if (a.time < b.time) return -1;
    else return 0;
  });
  /* JSON Stringify */
  let postListAscJSON = JSON.stringify(postListSort);
  /* Return to LS */
  localStorage.setItem("localPostList", postListAscJSON);
  /* Reload page */
  location.reload();
}

function sortDes() {
  /* Get List from LS */
  let postList = localStorage.getItem("localPostList");
  /* JSON Parse */
  let postListJSON = JSON.parse(postList);
  /* Sort List */
  let postListSort = postListJSON.sort((a, b) => {
    if (a.time > b.time) return 1;
    if (a.time < b.time) return -1;
    else return 0;
  });
  /* Descendent */
  let postListDes = postListSort.reverse();
  /* JSON Stringify */
  let postListDesJSON = JSON.stringify(postListDes);
  /* Return to LS */
  localStorage.setItem("localPostList", postListDesJSON);
  /* Reload page */
  location.reload();
}

function localStoragepostList(plist) {
  localStorage.setItem("localPostList", JSON.stringify(plist));
}

function deletePost(_id) {
  let objectStored = JSON.parse(localStorage.getItem("localPostList"));
  let postListIndex = postList.findIndex((element) => element._id === _id);
  objectStored.splice(postListIndex, 1);
  let postListJSON = JSON.stringify(objectStored);
  localStorage.setItem("localPostList", postListJSON);
  location.reload();
}

function addPost() {
  let today = new Date();
  let newPost = {
    _id: postList.length,
    name: "Daniel Aldana",
    post: document.getElementById("inputPost").value,
    date:
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate(),
    time:
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
  };
  /* Push New Post to List */
  postList.push(newPost);
  /* Save Post List in LS */
  localStoragepostList(postList);
  /* Clean Input Field */
  document.getElementById("inputPost").value = "";
  location.reload();
}

function filterByDate(postList) {
  postList.sort(function (a, b) {
    return a.date - b.date;
  });
}

function responsive() {
  var x = document.getElementById("top-nav");
  if (x.className === "nav-bar") {
    x.className += " responsive";
  } else {
    x.className = "nav-bar";
  }
}
