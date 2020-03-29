import React, { Component } from 'react';
import axios from'axios';


const User = props => (
    <tr>
      <td>{props.user.username}</td>
      <td>
       <a href="" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
      </td>
    </tr>
  )


export class ManageUser extends Component {
  constructor(props){
      super(props);
      this.state = {
              users:[]
      }
  }
  componentDidMount(){
    axios.get('http://localhost:5000/users/').then(res=>{
        this.setState({users : res.data})
    }).catch((err)=> {console.log(err)})
  }

  deleteUser=(id)=>{
    axios.delete('http://localhost:5000/manage/'+id)
    .then(response => { console.log(response.data)});

  this.setState({
    users: this.state.users.filter(el => el._id !== id)
  })
  }

  userList=()=>{
      return this.state.users.map(urs=>{
          return <User user={urs} deleteUser ={this.deleteUser}   key = {urs._id}   />
      })
  }

    render() {
        return (
            <div>
            <h3>Manage Users</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.userList()}
              </tbody>
            </table>
          </div>
        )
    }
}

export default ManageUser
