import React from 'react';
import Card from './Card'
import Header from './Header'
class App extends React.Component {
  state = {
    word: "",
    card: false,
    defaultScreen: [],
  }
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  buttonDelete = (index) => {
    //eslint-disable-next-line no-restricted-globals
    let validation = confirm("anda yakin ingin menghapus ini ?")
    if (validation) {
      delete this.state.defaultScreen[index]
      this.setState({
        defaultScreen: this.state.defaultScreen
      })
    }
    console.log(validation)


  }
  buttonClear = () => {
    this.setState({
      defaultScreen: []
    })
  }
  buttonAdd = () => {
    if (this.state.word === "") {
      this.setState({
        card: false,
        defaultScreen: []
      })
    } else {
      this.state.defaultScreen.push({
        word: this.state.word
      })
      this.setState({
        card: true,
        defaultScreen: this.state.defaultScreen
      })
    }


  }
  render() {
    let display;
    if (this.state.card) {
      display = this.state.defaultScreen.map((data, index) => <Card word={this.state.word} index={index} buttonDelete={this.buttonDelete} />)
    }
    return (
      <div className="container" id="container">
        <Header />
        <div className="card" id="card">

          <div className="card-body">
            <div className="input-group mb-3">
              <input type="text" name="word" autoComplete="off" value={this.state.word} onChange={this.handleInputChange} />

              <div className="input-group-append col-xs-4">
                <button className="btn btn-outline-primary btn-lg" onClick={this.buttonAdd}>Add Todo's</button>
                <button className="btn btn-outline-warning btn-lg" onClick={this.buttonClear}>Clear Todo's</button>
              </div>

            </div>
          </div>
        </div>
        <div className="card mt-3 mb-3">
          <div className="card-body">
            <div className="display-4">
              To-do list : 
        </div>
          </div>
        </div>

        {display}
      </div>

    )
  }

}

export default App;
