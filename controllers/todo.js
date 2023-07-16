// 先從 model 引入 todos 資料
const todoModel = new (require('../models/todo'))

// 建立一個 todoController 物件，透過方法來存取 model 的資料
const todoController = {
  // 傳入參數 req, res
  getAll: (req, res) => {
    const todo = todoModel.getAll()
    res.render('hello', {
      todo
    })
  },

  get: (req, res) => {
    const id = req.params.id
    const todo = todoModel.get(id)
    res.render('todo', {
      todo
    })
  },

  getDB: (req, res)=>{
    todoModel.getDB('test').then(results => {
      res.send(results);
    });
  }
}

module.exports = todoController