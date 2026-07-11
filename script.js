//making a storage area to store my tasks
let tasks =JSON.parse(localStorage.getItem('tasks'))|| [];
showTaskprev();
localStorage.clear();
//Now i am adding some task which i have to complete. 
document.querySelector('#addBtn').addEventListener('click', () => {
    let taskName = document.querySelector('.task');
    if (taskName.value === "") {
        alert("Please enter a task first");
    } else {
        let priority = document.querySelector('input[name="priority"]:checked').value
        tasks.push({ "task": taskName.value, "priority": priority });
        showTaskList();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        document.querySelector('.task').value = "";
    };

})
function showTaskprev(){
    tasks.forEach(goal => {
        let tasklist = document.createElement('li');
        tasklist.innerHTML = `
        <input type='checkbox' name = "done"id="check">
        <p class="name">${goal["task"]}<p>
        <p style="font-size:9px" class="prio" Value="${goal["priority"]}">priority : ${goal["priority"]}</p>
        <div>
            <button class="edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
        `
        let taskList_container = document.querySelector('.taskList');
        taskList_container.appendChild(tasklist);
    })
}
//making adding task fastly by using enter key 
document.querySelector('.task').addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        let taskName = document.querySelector('.task');
        if (taskName.value === "") {
            alert("Please enter a task first");
        } else {
            let priority = document.querySelector('input[name="priority"]:checked').value
            tasks.push({ "task": taskName.value, "priority": priority });
            showTaskList();
            localStorage.setItem("tasks", JSON.stringify(tasks));
            document.querySelector('.task').value = "";

        };
    }
})
//This is how my task will gonna look like. 
function showTaskList() {
    let tasklist = document.createElement('li');
    tasks.forEach(goal => {
        tasklist.innerHTML = `
        <input type='checkbox' name = "done"id="check">
        <p class="name">${goal["task"]}<p>
        <p style="font-size:9px" class="prio" Value="${goal["priority"]}">priority : ${goal["priority"]}</p>
        <div>
            <button class="edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
        `
    })
    let taskList_container = document.querySelector('.taskList');
    taskList_container.appendChild(tasklist);
}
//RD operation code which used to edit and delete tasks. 
document.querySelector('.taskList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        ischeak();
        analyse();
        e.target.closest('li').remove();
    }
    if (e.target.classList.contains('edit')) {
        document.querySelector('.task').value = document.querySelector('.name').innerHTML;
        e.target.closest('li').remove();
    }
});

let values = 0;
function ischeak(){
    let cheak = document.querySelector('#check:checked');
    let val = document.querySelector('.taskList');
    if(cheak!==null){
        console.log("cheaked")
        values+=1;
        celebrate();
    }else{
        console.log("Not cheaked");
    }
    console.log(values);
    console.log(tasks.length);
}
let high = 1;
function analyse(){
    
    document.querySelector('#dashboardCompletion').innerHTML = Math.ceil((values/tasks.length)*100) + "%";
    document.querySelector('#Scoreboard').innerHTML = values;
    let pri = document.querySelector('.prio').innerHTML;
    console.log(pri);
    if(pri.includes("High")){
        document.querySelector('.high').innerHTML = high;
        high+=1;
    }
    document.querySelector('.pending').innerHTML = tasks.length-values;

}
const celebrate=()=>{
    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }
    confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: .6 }
    });
}
