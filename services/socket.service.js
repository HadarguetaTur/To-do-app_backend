const socketio = require('socket.io');
module.exports = {
  notifyTaskUpdated,
  init,
  setToggleWorker
}

let gIo

function init(httpServer, corsOptions) {
  gIo = socketio(httpServer, {
    cors: {
      ...corsOptions,
      methods: ["GET", "POST"]
    }
  })
  gIo.on('connection', socket => {
    console.info(`Socket ${socket.id} has connected to tasks namesapce`)
    
    socket.on("disconnect", () => {
      console.info(`Socket ${socket.id} has disconnected from tasks.`)
    });
  })
}


function notifyTaskUpdated(task) {
  gIo && gIo.emit("taskUpdated", task)
}

function setToggleWorker(status) {
  if(gIo) gIo.emit("setToggleWorker", status)
}