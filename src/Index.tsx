/// <reference path="./../typings/main.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as uuid from "node-uuid";

import { ITodo } from "./Todo";
import Application, { IApplicationProps } from "./Application";


class ApplicationStorage implements IApplicationProps {
    public todos: ITodo[] = [];
    private callback: () => void;
    
    public onNotify(callback: () => void) {
        this.callback = callback;
    }
    
    private notify() {
        if (this.callback) {
            this.callback();
        }
    }
    
    public onAdd = (text: string) => {
        this.todos.unshift({
            id: uuid.v4(),
            text: text,
            done: false
        });
        this.notify();
    };
    
    public onDelete = (id: string) => {
        this.todos = this.todos
            .filter(todo => todo.id !== id);
        this.notify();
    };
    
    public onToggle = (id: string) => {
        this.todos
            .filter(todo => todo.id === id)
            .forEach(todo => todo.done = !todo.done);
        this.notify();
    };
}

let storage = new ApplicationStorage();

function render() {
    let application = (<Application 
        todos={storage.todos}
        onAdd={storage.onAdd}
        onDelete={storage.onDelete}
        onToggle={storage.onToggle} />);
    ReactDOM.render(application, document.getElementById("app"));
}
storage.onNotify(render);

window.onload = () => {
    render();
};