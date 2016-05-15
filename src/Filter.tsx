import * as React from "react";


export enum Show { All, Done, Active }

export interface IFilterProps {
    show: Show;
    filter: string;
    onShowChange: (value: Show) => void;
    onFilterChange: (value: string) => void;
}

export default class Filter extends React.Component<IFilterProps, any> {
    public render() {
        return (
            <div className="form form-horizontal">
                <div className="form-group">
                    <label className="control-label col-md-1">Search</label>
                    <div className="col-md-11">
                        <input 
                            placeholder="Text to search" 
                            type="text" 
                            className="form-control"
                            onChange={this.onFilterChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-md-1">Show</label>
                    <div className="col-md-11">
                        <div className="btn-group">
                            {this.button(Show.Active)}
                            {this.button(Show.Done)}
                            {this.button(Show.All)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    private button(show: Show) {
        let active = show === this.props.show;
        let className = `btn btn-default ${active ? "active" : "" }`;
        return (
            <button 
                className={className}
                onClick={this.onShowChange(show)}>
                {humanizeShow(show)}
            </button>
        );
    }
    
    private onShowChange = (value: Show) => () => {
        this.props.onShowChange(value);
    };
    
    private onFilterChange = (e: React.FormEvent) => {
        let input = e.target as HTMLInputElement;
        this.props.onFilterChange(input.value);
    };
}

function humanizeShow(show: Show) {
    switch (show) {
        case Show.Active: return "Active";
        case Show.Done: return "Done";
        case Show.All: return "All";
    }
}