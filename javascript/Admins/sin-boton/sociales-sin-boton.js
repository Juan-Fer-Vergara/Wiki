import {onGetTasks,saveTask,deleteTask,getTask,updateTask,getTasks,} from "../../crud/sociales.js";
  
  const taskForm = document.getElementById("btn-task-form");
  const tasksContainer = document.getElementById("tasks-container");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    onGetTasks((querySnapshot) => {
      tasksContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const task = doc.data();
  
        tasksContainer.innerHTML += `
        <div class="contenedor">
        <h3 class="h5">${task.title}</h3>
        <p>${task.description}</p>
        
        
      </div>`;
  
      const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
      console.log(btnsDelete);
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deleteTask(dataset.id, "español");
          } catch (error) {
           
          }
        })
      );
    })
      const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getTask(e.target.dataset.id);
            const task = doc.data();
            taskForm["task-title"].value = task.title;
            taskForm["task-description"].value = task.description;
            taskForm["task-img"].value = task.img;
  
            editStatus = true;
            id = doc.id;
            taskForm["btn-task-form"].innerText = "Update";
          } catch (error) {
            
          }
        });
      });
    });
  });
  
  taskForm.addEventListener("click", async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title');
    const description = document.getElementById("task-description");
    console.log(title.value);
    try {
      if (!editStatus) {
        await saveTask(title.value, description.value, "español");
      } else {
        await updateTask(id, {
          title: title.value,
          description: description.value,
          img: img.value,
        });
  
        editStatus = false;
        id = "";
        taskForm["btn-task-form"].innerText = "Save";
      }
  
      taskForm.reset();
      title.focus();
    } catch (error) {
      
    }
  });