import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todoArray: any[];
  constructor(private toDoSer: TodoService) { }

  ngOnInit() {
    this.toDoSer.getToDo().snapshotChanges()
    .subscribe(item => {
      this.todoArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.todoArray.push(x);
      })

      this.todoArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
    });
  }

  onAdd(itemTitle){
    
    this.toDoSer.add(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string, isChecked){
    this.toDoSer.checkUncheckTitle($key, !isChecked);
  }

  delete($key: string){
    this.toDoSer.remove($key);
  }
}
