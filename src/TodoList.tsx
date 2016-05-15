import * as React from "react";

import Todo, { ITodo }  from "./todo";


export interface ITodoListProps {
    todos: ITodo[];
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export default class TodoList extends React.Component<ITodoListProps, any> {
    public render() {
        let todos = this.props.todos;
        
        if (todos.length === 0) {
            return (
                <div style={{display: "none"}}></div>
            );
        } else {
            let items = todos.map(todo => {
                return (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        onDelete={this.onDelete(todo.id)}
                        onToggle={this.onToggle(todo.id)} />
                );
            });
        
            return (
                <table className="table table-fixed-header">
                    <thead>
                        <tr>
                            <th>Done</th>
                            <th>Task</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            );
        }
    }
    
    private onDelete = (id: string) => () => {
        this.props.onDelete(id);
    }
    
    private onToggle = (id: string) => () => {
        this.props.onToggle(id);
    }
}