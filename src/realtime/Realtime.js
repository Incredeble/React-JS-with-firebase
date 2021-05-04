import { Component } from 'react';
import '../App.css';
import Firebase from '../data';

export default class Realtime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contact : "",
      count: 0,
      data:[],
    }
  }
  handleInput = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }

  handleSubmit = (e) => {
    Firebase.database().ref('/').child(this.state.count).set({'name':this.state.name,'contact':this.state.contact
  });
  this.setState({count:this.state.count+1});
  console.log('DATA SAVED');
  this.get();
  }

  get = () => {
    Firebase.database().ref('/').on('value',snapshot => {
      let dataList= [];
      snapshot.forEach(snap => {
        dataList.push(snap.val());
      });
      this.setState({data:dataList});
    });
    console.log('DATA loaded');
  } 

  update = () => {
    Firebase.database().ref('/').child(this.state.count).update({'nameid':'Vaibhav'});
  }

  delete  = () => {
    Firebase.database().ref('/').child(this.state.count).remove();
    this.get();
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
      {console.log(this.state.count)}
        <input type="text" placeholder='enter your name' name='name' value={this.name} onChange={this.handleInput}/>
        
        <br />
        <input type="text" placeholder='enter your mobile' name='contact' value={this.contact} onChange={this.handleInput}/>
        
        <br />
        <button type='submit' onClick={this.handleSubmit}>Add Data</button>
        <br />
        <hr/>
        <br/>
        <button type='submit' onClick={this.update}>Update Data</button>
        <br />
        <hr />
        <br/>
        <button type='submit' onClick={this.delete}>Delete Data</button>
        <br />
        <hr />
        <br/>
        <button type='submit' onClick={this.get}>Get Data</button>
        <br/>
        <table>
          <thead>
            <tr><th>Name</th><th>Contact</th></tr>
          </thead>
          <tbody>
          {
          this.state.data.map((item) => {
            return (
            <tr>
              <td>{item.name}</td>
              <td>{item.contact}</td>
            </tr>
            )
        })
        }
          </tbody>
        </table>
        <br/>
        <hr />
        <br/>

        

      </header>
    </div>
  );}
}
