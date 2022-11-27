document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

// const divTitle = document.getElementsByClassName(
//   "me-auto p-2 bd-highlight"
// ).innerText;
// console.log(divTitle);

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    // let title = event.target.dataset.content;
    const newTitle = prompt("Введите новое название");
    newTitle
      ? edit(id, newTitle).then(() => {
          event.target.previousElementSibling.innerText = newTitle;
        })
      : null;
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, title) {
  await fetch(`/${id}/${title}`, { method: "PUT" });
}
