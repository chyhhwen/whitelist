var DB=new (require('../lib/DataBase'))

// 建立一個 todoModel 物件，裡面放存取資料的方法（function）
class todoModel{
  table='access';
  getDB()
  {
    return DB.Read(this.table);
  }
}

module.exports = todoModel