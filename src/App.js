import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Member from './components/Members/Member';
import Forms from './components/Forms/Forms';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       members: [],
       first_name: '',
       last_name: '',
       buttonDisabled: false,
       formStatus: 'create',
       memberIdSelected: null,
    }
  }

  componentDidMount(){
    axios.get('https://reqres.in/api/users?page=1')
      .then(res =>{
        this.setState({members: res.data.data});
      })
      .catch(err=>{
        console.log('error', err)
      });
  }
  
  inputOnChangeHandler = (e) =>{
    let targetName = e.target.name;
    let targetValue = e.target.value;
    this.setState({[targetName]: targetValue });
  }

  addMember = (url, payload)=>{
    axios.post(url, payload)
        .then(res =>{
          let members = [...this.state.members];
          members.push(res.data);
          this.setState({ 
            members, 
            buttonDisabled: false,
            first_name:'',
            last_name: '',
          
          })
          alert("form berhasil disubmit");
        }
        )
        .catch(e=> console.log(e));
  }

  editMember = (url, payload)=>{
    axios.put(url, payload)
        .then(res=>{
          let members = [...this.state.members];
          let indexMember = members.findIndex(m=> m.id ===this.state.memberIdSelected);

          members[indexMember].first_name = res.data.first_name;
          members[indexMember].last_name = res.data.last_name;

          this.setState({
            members,
            buttonDisabled: false,
            first_name: '',
            last_name: '',
            formStatus: 'create',
            memberIdSelected: null
          })

          alert(`user id ${this.state.members[indexMember].id} berhasil diedit`);
        })
        .catch(e=> console.log(e));
  }

  deleteButtonHandler = (id)=>{
    let url =`https://reqres.in/api/users/${id}`;
    axios.delete(url)
      .then(res=>{
        if(res.status === 204){
          let members = this.state.members.filter(m=> m.id !== id);
          this.setState({ members });
          alert(`user id ${id} berhasil dihapus`);
        }
      })
  }

  onSubmitHandler = (e) =>{
    
    e.preventDefault();
    this.setState({buttonDisabled:true})
    let payload ={
      first_name: this.state.first_name,
      last_name: this.state.last_name
    }

    let url = 'https://reqres.in/api/users';

    if(this.state.formStatus === 'create'){
      this.addMember(url,payload);
    }
    else if(this.state.formStatus === 'edit'){
      url = `https://reqres.in/api/users/${this.state.memberIdSelected}`;
      this.editMember(url,payload);
    }

    
    
    
  }

  editButtonHandler = (member) =>{
    this.setState({
      first_name: member.first_name,
      last_name: member.last_name,
      formStatus: 'edit',
      memberIdSelected: member.id,
    })
  }

  render(){
    let memberList = [];
    this.state.members.forEach((member)=>{
      memberList.push(
        <Member
          key = {member.id}
          member = { member }
          editButtonHandler= {(member)=> this.editButtonHandler(member)}
          deleteButtonHandler= {(id)=> this.deleteButtonHandler(id)}
        />
      );
    });

    return (
      <div className="container">
        <h1>CodePolitan DevSchool</h1>
        <div className="row">
          {/* member */}
          <div className="col-6" style={{border: '1px solid black'}}>
            <h2>Member</h2>
            <div className="row">
            { memberList }
            </div>
            
          </div>
          
          {/* form */}
          <div className="col-6"style={{border:'1px solid black'}}>
            <h2>Form {this.state.formStatus} </h2>
            <Forms
              onSubmit = {this.onSubmitHandler}
              onChange = {this.inputOnChangeHandler}
              first_name = {this.state.first_name}
              last_name = {this.state.last_name}
              buttonDisabled = {this.state.buttonDisabled}
            />
          </div>
        </div>
      </div>

    );
  }
}

export default App;
