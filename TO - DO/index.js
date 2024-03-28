document.addEventListener('DOMContentLoaded', () => {
    let textfeild = document.getElementById("textfeild");
    let submit = document.getElementById("submit");
    let list = document.getElementById("list");
    let i = 0;
    
    // Function to add task
    const addTask = (taskText) => {
        list.innerHTML += `<div id="listedItem"><li>${i+1}. ${taskText}</li><button class="deleteBtn">Delete</button></div>`;
        i++;
        updateLocalStorage(); // Update local storage after adding a task
    };

    // Function to delete task
    const deleteTask = (event) => {
        if (event.target.classList.contains("deleteBtn")) {
            event.target.parentElement.remove();
            updateLocalStorage(); // Update local storage after deleting a task
        }
    };

    // Function to update local storage
    const updateLocalStorage = () => {
        const tasks = [];
        document.querySelectorAll("#list li").forEach(task => {
            tasks.push(task.textContent.slice(3)); // Remove the numbering before storing
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Add tasks from local storage when the page loads
    const loadTasksFromLocalStorage = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
            tasks.forEach(task => {
                addTask(task);
            });
        }
    };

    submit.addEventListener('click', () => {
        if (textfeild.value.trim() !== "") { // Check if input is not empty
            addTask(textfeild.value);
            textfeild.value = ""; // Clear the input field after adding the task
        }
    });

    list.addEventListener("click", deleteTask);

    loadTasksFromLocalStorage(); // Load tasks from local storage when the page loads
});
