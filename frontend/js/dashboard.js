const token = localStorage.getItem('token');

// Redirect user if not logged in
if (!token) {
  window.location.href = 'login.html';
}

const authHeaders = () => ({
  Authorization: `Bearer ${token}`,
});

const jsonHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

// Dark mode persists in localStorage
const darkToggle = document.getElementById('darkToggle');
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
}

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

const safeDate = (date) => {
  if (!date) return 'No due date';
  return new Date(date).toLocaleDateString();
};

const loadUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, { headers: authHeaders() });
    if (!res.ok) throw new Error('Unauthorized');
    const user = await res.json();
    document.getElementById('userGreeting').textContent = `Welcome, ${user.name}`;
  } catch (error) {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }
};

// Task functions
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('taskTitle').value;
  const subject = document.getElementById('taskSubject').value;
  const dueDate = document.getElementById('taskDueDate').value;

  await fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ title, subject, dueDate }),
  });

  taskForm.reset();
  loadTasks();
});

const loadTasks = async () => {
  const res = await fetch(`${API_BASE_URL}/api/tasks`, { headers: authHeaders() });
  const tasks = await res.json();

  taskList.innerHTML = tasks.length ? '' : '<p class="empty">No tasks added yet.</p>';
  tasks.forEach((task) => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <div>
        <strong class="${task.status === 'complete' ? 'completed' : ''}">${task.title}</strong>
        <p>${task.subject || 'General'} • ${safeDate(task.dueDate)} • ${task.status}</p>
      </div>
      <div class="item-actions">
        <button onclick="toggleTask('${task._id}', '${task.status}')">${task.status === 'complete' ? 'Pending' : 'Complete'}</button>
        <button class="danger-text" onclick="deleteTask('${task._id}')">Delete</button>
      </div>
    `;
    taskList.appendChild(item);
  });
};

window.toggleTask = async (id, currentStatus) => {
  const nextStatus = currentStatus === 'complete' ? 'pending' : 'complete';
  await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(),
    body: JSON.stringify({ status: nextStatus }),
  });
  loadTasks();
};

window.deleteTask = async (id) => {
  await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  loadTasks();
};

// Attendance functions
const attendanceForm = document.getElementById('attendanceForm');
const attendanceList = document.getElementById('attendanceList');

attendanceForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const subject = document.getElementById('attendanceSubject').value;
  const totalClasses = Number(document.getElementById('totalClasses').value);
  const attendedClasses = Number(document.getElementById('attendedClasses').value);

  const res = await fetch(`${API_BASE_URL}/api/attendance`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ subject, totalClasses, attendedClasses }),
  });

  if (!res.ok) {
    const data = await res.json();
    alert(data.message);
  }

  attendanceForm.reset();
  loadAttendance();
});

const loadAttendance = async () => {
  const res = await fetch(`${API_BASE_URL}/api/attendance`, { headers: authHeaders() });
  const records = await res.json();

  attendanceList.innerHTML = records.length ? '' : '<p class="empty">No attendance record yet.</p>';
  records.forEach((record) => {
    const percent = record.percentage || Math.round((record.attendedClasses / record.totalClasses) * 100) || 0;
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <div>
        <strong>${record.subject}</strong>
        <p>${record.attendedClasses}/${record.totalClasses} classes • ${percent}%</p>
      </div>
      <button class="danger-text" onclick="deleteAttendance('${record._id}')">Delete</button>
    `;
    attendanceList.appendChild(item);
  });
};

window.deleteAttendance = async (id) => {
  await fetch(`${API_BASE_URL}/api/attendance/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  loadAttendance();
};

// Notes functions
const noteForm = document.getElementById('noteForm');
const noteList = document.getElementById('noteList');

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', document.getElementById('noteTitle').value);
  formData.append('noteFile', document.getElementById('noteFile').files[0]);

  const res = await fetch(`${API_BASE_URL}/api/notes/upload`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    alert(data.message);
  }

  noteForm.reset();
  loadNotes();
});

const loadNotes = async () => {
  const res = await fetch(`${API_BASE_URL}/api/notes`, { headers: authHeaders() });
  const notes = await res.json();

  noteList.innerHTML = notes.length ? '' : '<p class="empty">No notes uploaded yet.</p>';
  notes.forEach((note) => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <div>
        <strong>${note.title}</strong>
        <p>${note.fileType}</p>
      </div>
      <div class="item-actions">
        <a target="_blank" href="${API_BASE_URL}${note.filePath}">View</a>
        <button class="danger-text" onclick="deleteNote('${note._id}')">Delete</button>
      </div>
    `;
    noteList.appendChild(item);
  });
};

window.deleteNote = async (id) => {
  await fetch(`${API_BASE_URL}/api/notes/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  loadNotes();
};

// AI suggestion functions
const aiForm = document.getElementById('aiForm');
aiForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const examDate = document.getElementById('examDate').value;
  const subjects = document.getElementById('subjects').value;
  const weakTopics = document.getElementById('weakTopics').value;

  const res = await fetch(`${API_BASE_URL}/api/ai/suggest`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ examDate, subjects, weakTopics }),
  });

  const data = await res.json();
  document.getElementById('aiOutput').textContent = data.suggestion || data.message;
});

// Initial dashboard loading
loadUser();
loadTasks();
loadAttendance();
loadNotes();
