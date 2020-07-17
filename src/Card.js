import React from 'react';
import './App.css';
import swal from 'sweetalert';

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            button: "Edit",
            todo: props.word
        }
    }
    edit = () => {
        if (this.state.status) {
            swal("Good Job !","to-do berhasil diubah !","success");
            this.setState({
                status: false,
                button: "Edit"
            })
        } else {
            
            this.setState({
                status: true,
                button: "Save"
            })
        }
    }
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        let element
        let { buttonDelete, index } = this.props

        if (this.state.status) {
            element = <input type="text" name="todo" className="form-control" value={this.state.todo} onChange={this.handleInputChange} />
        } else {
            element = <input type="text" className="form-control" value={this.state.todo} disabled />
        }
        return (
            <div className="card" id="card">
                <div className="card-body">
                    <div className="lead mb-3">To-do {index + 1}</div>
                    <div className="input-group mb-3">

                        {element}

                        <div className="input-group-append col-xs-4">
                            <button className="btn btn-outline-info" onClick={() => { this.edit() }}>{this.state.button}</button>
                            <button className="btn btn-outline-danger" onClick={() => { buttonDelete(index) }}>Remove</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Card;