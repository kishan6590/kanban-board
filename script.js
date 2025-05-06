const boards = document.querySelectorAll(".boards");

boards.forEach((board) => {
  const input = board.querySelector(".inputField");
  const status = board.querySelector(".status");

  const itemContainer = board.querySelector(".itemContainer");

  const btn = board.querySelector(".btn");

  btn.addEventListener("click", () => {
    const task = input.value.trim();
    if (task === "") return;
    const statusValue = status.innerText;
    const inputValue = input.value;

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="itemStatus">  ${status.innerText}</div>
    <p class="itemContent" > ${input.value}</p>`;
    input.value = "";
    div.setAttribute("draggable", "true");
    div.classList.add("item");
    div.addEventListener("contextmenu", () => {
      console.log("hi");
    });
    itemContainer.appendChild(div);

    countUpdate();
    saveToLocalStorage();
    //  addingeventlistner to all the items of board to add or remove dragging class
    const items = board.querySelectorAll(".item");
    items.forEach((item) => {
      item.addEventListener("dragstart", () => {
        item.classList.add("flying");
      });
      item.addEventListener("dragend", () => {
        item.classList.remove("flying");
      });
    });
  });
});

//adding evenlistener to all the baords to catch dragging element

boards.forEach((board) => {
  board.addEventListener("dragover", () => {
    const flyingElement = document.querySelector(".flying");
    const itemContainer = board.querySelector(".itemContainer");
    itemContainer.appendChild(flyingElement);
    countUpdate();
    saveToLocalStorage();
    status();
  });
});

//count updating
function countUpdate() {
  boards.forEach((board) => {
    const itemContainer = board.querySelector(".itemContainer");
    const allItems = itemContainer.querySelectorAll(".item");
    const count = allItems.length;
    const countElement = board.querySelector(".count");
    countElement.innerHTML = `${count}`;
  });
}
//updaing the status of item's status
function status() {
  boards.forEach((board) => {
    const boardStatus = board.querySelector(".status");

    const statusContainer = board.querySelectorAll(".itemStatus");
    statusContainer.forEach((status) => {
      status.innerHTML = `${boardStatus.innerText}`;
    });
  });
}

// saving the data to localStorage
function saveToLocalStorage() {
  const data = [];
  boards.forEach((board) => {
    const status = board.querySelector(".status").innerHTML;
    const allItems = board.querySelectorAll(".item");
    allItems.forEach((item) => {
      const content = item.querySelector(".itemContent").innerHTML;
      console.log(status, content);
      data.push({
        status,
        content,
      });
    });
  });
  if (data.length == 0) return;

  localStorage.setItem("data", JSON.stringify(data));
}

//getting data from local storage and on webpage and rendering the data
window.addEventListener("load", () => {
  const datas = JSON.parse(localStorage.getItem("data"));
  console.log("datas", datas);

  if (datas == [] || !datas) return;
  datas.forEach((data) => {
    const div = document.createElement("div");
    const status = data.status;
    const content = data.content;

    const idStatus = status.replace(/\s+/g, "").trim();
    
    console.log("si", status, content,"id", idStatus);

    div.innerHTML = `
    <div class="itemStatus">  ${status}</div>
    <p class="itemContent" > ${content}</p>`;
    const board = document.querySelector(`#${idStatus}`);
    console.log("in", board);
    const itemContainer = board.querySelector(".itemContainer");
    console.log("item", itemContainer);
    console.log("div", div);
    div.setAttribute("draggable", "true");
    div.classList.add("item");
    itemContainer.appendChild(div);

    const items = itemContainer.querySelectorAll(".item");
    items.forEach((item) => {
      item.addEventListener("dragstart", () => {
        item.classList.add("flying");
      });
      item.addEventListener("dragend", () => {
        item.classList.remove("flying");
      });
    });
  });
  countUpdate();
});

countUpdate();
