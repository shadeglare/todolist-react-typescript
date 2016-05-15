/// <reference path="./../typings/main.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as uuid from "node-uuid";

import { ITodo } from "./Todo";
import Application, { IApplicationProps } from "./Application";


class ApplicationStorage implements IApplicationProps {
    public todos: ITodo[] = [];
    private callback: () => void;
    
    public onChange(callback: () => void) {
        this.callback = callback;
    }
    
    public onAdd = (text: string) => {
        this.todos.unshift({
            id: uuid.v4(),
            text: text,
            done: false
        });
        this.callback();
    };
    
    public onDelete = (id: string) => {
        this.todos = this.todos
            .filter(todo => todo.id !== id);
        this.callback();
    };
    
    public onToggle = (id: string) => {
        this.todos
            .filter(todo => todo.id === id)
            .forEach(todo => todo.done = !todo.done);
        this.callback();
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
storage.onChange(render);

window.onload = () => {
    render();
};