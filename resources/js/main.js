document.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    const task = document.getElementById("task").value;
    if (task) {
      console.log(task);
    }
  }
});
