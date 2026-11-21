    const form = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const searchInput = document.getElementById('searchInput');
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.getElementById('emptyMessage');
    let tasks = [];

    function renderTasks() {
      const query = searchInput.value.trim().toLowerCase();
      const visibleTasks = tasks.filter(task => task.text.toLowerCase().includes(query));
      taskList.replaceChildren();

      visibleTasks.forEach(task => {
        const item = document.createElement('li');
        item.className = `task${task.done ? ' done' : ''}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.setAttribute('aria-label', `Mark ${task.text} as ${task.done ? 'not completed' : 'completed'}`);
        checkbox.addEventListener('change', () => {
          task.done = checkbox.checked;
          renderTasks();
        });

        const label = document.createElement('span');
        label.textContent = task.text;

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'delete';
        remove.textContent = 'Delete';
        remove.addEventListener('click', () => {
          tasks = tasks.filter(entry => entry.id !== task.id);
          renderTasks();
        });

        item.append(checkbox, label, remove);
        taskList.append(item);
      });

      emptyMessage.hidden = tasks.length > 0 || query.length > 0;
    }

    form.addEventListener('submit', event => {
      event.preventDefault();
      const text = taskInput.value.trim();
      if (!text) {
        taskInput.focus();
        return;
      }
      tasks.push({ id: Date.now() + Math.random(), text, done: false });
      taskInput.value = '';
      renderTasks();
      taskInput.focus();
    });

    searchInput.addEventListener('input', renderTasks);
