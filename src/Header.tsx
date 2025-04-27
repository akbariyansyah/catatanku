import React from 'react';
import './App.css';

class Header extends React.Component {
    render() {
        return (
            <div className="jumbotron" id="jumbotron">
                
                <h1 className="display-4">Hello, world!</h1>
                <p className="lead">Welcome to the todo-list-app</p>
                <hr className="my-4" />
                <p>list you activities like pro !</p>

            </div>
        )
    }
}
export default Header