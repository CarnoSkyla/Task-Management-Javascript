document.addEventListener('DOMContentLoaded', function() {
  addUserAndGroup()
  displayAndHideForm()
  getFormData()
  var form = document.getElementById('form');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    taskCreate();
    displayTask();
  })

  var rdbtn = document.getElementById('redirect-btn');
  rdbtn.addEventListener('click', function() {
    window.location.href = 'task.html'
  })

  logUserOut()
})


function addUserAndGroup() {

  if (localStorage.getItem('users') == null || localStorage.getItem('groups') == null) {
    var userStorage = []
    var user1 = {
      name: 'Carno',
      email: 'sibusiso@quirky30.co.za',
      password: '1234'
    }

    var user2 = {
      name: 'Skyla',
      email: 'skyla@gmail.co.za',
      password: '2345'
    }

    var user3 = {
      name: 'Sbuda',
      email: 'sbu@gmail.co.za',
      password: '3456'
    }
    userStorage.push(user1)
    userStorage.push(user2)
    userStorage.push(user3)

    var groupStorage = []

    var backlog = {
      name: 'Backlog',
      createdAt: new Date()
    }
    var inprogress = {
      name: 'In Progress',
      createdAt: new Date()
    }
    var onhold = {
      name: 'On Hold',
      createdAt: new Date()
    }
    var pending = {
      name: 'Pending',
      createdAt: new Date()
    }
    var complete = {
      name: 'Complete',
      createdAt: new Date()
    }
    groupStorage.push(backlog)
    groupStorage.push(inprogress)
    groupStorage.push(onhold)
    groupStorage.push(pending)
    groupStorage.push(complete)

    localStorage.setItem('users', JSON.stringify(userStorage))
    localStorage.setItem('groups', JSON.stringify(groupStorage))
  }


}

function displayAndHideForm() {
  var formbox = document.querySelector('.form-box')
  var btnDisplayForm = document.getElementById('btn');
  btnDisplayForm.addEventListener('click', function() {
    if (formbox !== undefined) {
      formbox.style.display = 'inline-block';
    }
  })

  var btnHideForm = document.getElementById('btn-hide');
  btnHideForm.addEventListener('click', function() {
    if (formbox !== undefined) {
      formbox.style.display = 'none'
    }
  })
}

function getFormData() {
  var userIdEl = document.querySelector('.users')
  var groupIdEl = document.querySelector('.groups')

  var userLocalData = JSON.parse(localStorage.getItem('users'))
  var groupLocalData = JSON.parse(localStorage.getItem('groups'))

  userLocalData.forEach(function(user, index) {
    userIdEl.innerHTML += `<option value="${index}">${user.name}</option>`
  })

  groupLocalData.forEach(function(group, index) {
    groupIdEl.innerHTML += `<option value="${index}">${group.name}</option>`
  })
}

function taskCreate() {
    var taskDesc = document.getElementById('desc').value;
    var userId = document.querySelector('.users').value;
    var groupId = document.querySelector('.users').value;
    var date = new Date();
    var newdate = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getYear();
    var newDate = newdate + " / " + month + " / " + year;
    var taskStorage = []

    var taskDetails = {
      TaskDescription: taskDesc,
      UserId: userId,
      groupId: groupId,
      createdAt: newDate
    }

    if (localStorage.getItem('task') != null) {
      taskStorage = JSON.parse(localStorage.getItem('task'))
      taskStorage.push(taskDetails)
      localStorage.setItem('task', JSON.stringify(taskStorage))
    }
    else {
      taskStorage.push(taskDetails)
      localStorage.setItem('task', JSON.stringify(taskStorage))
    }
    // window.location.reload()

    var backlogList = document.querySelector('.backlog-card--list')
    backlogList.addEventListener('click', function(e) {
      if (e.target.id === 'img2') {
        var taskLocalData = JSON.parse(localStorage.getItem('task'))
        e.target.parentElement.remove();
        let taskData = taskLocalData;
        var checkData = taskData.filter(function(task, index) {
          var taskId = parseInt(e.target.parentElement.dataset.id)
            return index != taskId;
        })

        localStorage.setItem('task', JSON.stringify(checkData))
      }

    })


}

function displayTask() {
  var taskLocalData = JSON.parse(localStorage.getItem('task'));
  var ul = document.querySelector('.backlog-card--list');
  taskLocalData.forEach(function(task, index) {
    ul.innerHTML += `<li class="backlog-list" data-id="${index}" id="list" ondragover="dragover(event)" draggable="true" ondragstart="drag(event)" ondragleave="dragleave(event)" ondragenter="dragenter(event)">${task.TaskDescription}<br /><img src="edit.png" alt="edit" style="margin: 10px 10px 0 0;" id="img1"><img src="delete.png" alt="edit" id="img2"></li>`
  })

  localStorage.setItem('task', JSON.stringify(taskLocalData))
}

function drag(e) {
  e.target.style.background = 'rgba(255, 255, 255, 0.3)'
  e.target.style.borderRadius = '10px'
  e.dataTransfer.setData('text', e.target.id);
  console.log(e);
}

function dragenter(e) {
  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
}

function dragover(e) {
  e.target.style.background = 'rgba(255, 255, 255, 0.5)';
}

function dragleave(e) {
  e.target.style.background = 'rgba(255, 255, 255, 1)';
}

function allowdrop(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  var data = e.dataTransfer.getData('text');
  e.target.appendChild(document.getElementById(data))
}

function dragend(e) {
  e.target.style.background = 'red';
}

function logUserOut() {
  var img = document.getElementById('c')
  img.addEventListener('click', function(){
    var logOutC = document.querySelector('.logout-info')
    if (logOutC != undefined) {
      logOutC.style.display = 'inline-block'
    }
  })

  var userOut = document.getElementById('user-out')
  userOut.addEventListener('click', function(){
    var askUser = confirm('Are you sure you want to log out')
    if (askUser === true) {
      localStorage.removeItem('tokens')
      window.location.href = 'index.html'
    }
    else {
      return false
    }
  })
}

// function noback() {
//   return 'fjsh'
// }
// function on() {
//   if (localStorage.getItem('token') != null) {
//     window.location.href = 'task.html'
//   }
// }
