import React from 'react';
import './fields.css'


class TextInput extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            name: this.props.name,
            placeholder: this.props.placeholder,
            value: this.props.value,
            onChange: this.props.handleChange,
            touched: this.props.touched,
            valid: this.props.valid
        }

    }

    render(){

        let formControl = "form-control";

        if (this.props.touched && !this.props.valid) {
            formControl = 'form-control control-error';
        }

        return (
            <div className="form-group">
                <input type="text" className={formControl} {...this.props}/>
            </div>
        );

    }

}

export default TextInput;