import * as React from "react";


interface IEditorProps {
    onAdd: (text: string) => void;
}

interface IEditorState {
    text: string;
}

export default class Editor extends React.Component<IEditorProps, IEditorState> {
    public constructor() {
        super();
        this.state = { text: "" };
    }
    
    public render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="input-group">
                    <input
                        type="text" 
                        className="form-control" 
                        placeholder="Task text"
                        value={this.state.text}
                        onChange={this.onChange} />
                    <span className="input-group-btn">
                        <button 
                            type="submit" 
                            className="btn btn-primary">Add task</button>
                    </span>
                </div>
            </form>
        );
    }
    
    private onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (this.state.text) {
            this.props.onAdd(this.state.text);
            this.setState({ text: "" });
        }
    };
    
    private onChange = (event: React.FormEvent) => {
        let input = event.target as HTMLInputElement;
        this.setState({ text: input.value });
    };
}