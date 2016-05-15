import * as React from "react";


export interface ITodo {
    id: string;
    text: string;
    done: boolean;
}

interface ITodoState {
    text: string;
}

interface ITodoProps {
    key: string;
    todo: ITodo;
    onDelete: () => void;
    onToggle: () => void;
}

export default class Todo extends React.Component<ITodoProps, ITodoState> {
    
    public constructor(props: ITodoProps) {
        super(props);
        this.state = { text: this.props.todo.text };
    }
    
    public render() {
        return (
            <tr>
                <td style={{verticalAlign: "middle", width: "5em"}}>
                    <input 
                        type="checkbox"
                        checked={this.props.todo.done}
                        onChange={this.props.onToggle} />
                </td>
                <td style={{
                    verticalAlign: "middle", 
                    textDecoration: this.props.todo.done ? 
                        "line-through" : "initial"}}>
                    {this.props.todo.text}
                </td>
                <td style={{width: "1em"}}>
                    <button 
                        className="btn btn-danger" 
                        onClick={this.props.onDelete}>Delete</button>
                </td>
            </tr>
        );
    }
}