import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todo: AngularFireList<any>;
  constructor(private fbdb: AngularFireDatabase) { }
  getToDo() {
    this.todo = this.fbdb.list('title');
    return this.todo;
  }
  
  add(title: string) {
    this.todo.push({
      title: title,
      isChecked: false
    });
  }

  checkUncheckTitle($key: string, flag: boolean){
    this.todo.update($key, { isChecked: flag });
  }

  remove($key: string){
    this.todo.remove($key);
  }
}
