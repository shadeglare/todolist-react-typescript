import * as React from "react";

import { ITodo } from "./Todo";
import TodoList from "./TodoList";
import Editor from "./Editor";
import Filter, { Show } from "./Filter";


export interface IApplicationProps {
    todos: ITodo[];
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    onAdd: (text: string) => void;
}

export interface IApplicationState {
    show?: Show;
    filter?: string;
}

export default class Application extends React.Component<IApplicationProps, IApplicationState> {
    public constructor(props) {
        super(props);
        this.state = {
            show: Show.Active,
            filter: ""
        };
    }
    
    public render() {
        return (
            <div className="container">
                <h1 className="page-header">ToDo List</h1>
                <Editor onAdd={this.props.onAdd} />
                <Filter 
                    show={this.state.show}
                    filter={this.state.filter}
                    onFilterChange={this.onFilterChange}
                    onShowChange={this.onShowChange} />
                <TodoList 
                    todos={this.filterTodos()}
                    onDelete={this.props.onDelete}
                    onToggle={this.props.onToggle} />
            </div>
        );
    }
    
    private onFilterChange = (filter: string) => {
        this.setState({ filter });
    };
    
    private onShowChange = (show: Show) => {
        this.setState({ show });
    };
    
    private filterTodos() {
        let { filter, show } = this.state;
        let todos = this.props.todos.filter(todo => {
            switch(show) {
                case Show.All: return true;
                case Show.Active: return !todo.done;
                case Show.Done: return todo.done;
            }
        });
        
        if (this.state.filter) {
            let query = this.state.filter.toLowerCase();
            return todos.filter(todo => 
                todo.text.toLowerCase().indexOf(query) !== -1);
        } else {
            return todos;
        }
    }
} 