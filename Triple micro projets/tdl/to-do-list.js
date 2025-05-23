const newTaskButton = document.getElementById('newtask');
const taskValueInput = document.getElementById('taskvalue');
const taskList = document.getElementById('tasklist');

newTaskButton.addEventListener('click', () => {
    const taskText = taskValueInput.value.trim();

    if (taskText === '') return;

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const textNode = document.createTextNode(' ' + taskText);

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(textNode);

    taskList.appendChild(taskDiv);

    taskValueInput.value = '';

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskList.removeChild(taskDiv);
        }
    });
});
