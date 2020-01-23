import React,{ Component } from "react";
import './main.css'
import firebase from './firebase'
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            pass:'',
        }
    }
    
    changeName=(event)=>{
        this.setState({name:event.target.value})
    }
    changePass=(event)=>{
        this.setState({pass:event.target.value})
    }
    click=()=>{
        let admin=false;
        let wrongData=false;
        const db=firebase.firestore();
        if(this.state.name!=='' && this.state.pass!=='')
        {db.collection('database').get().then(
            (query)=>{
                query.forEach(
                    (doc)=>{
                        console.log(doc.data())
                        if(doc.data().admin && doc.data().name===this.state.name && doc.data().password===this.state.pass)
                        admin=true
                        else
                        wrongData=true    
                        
                    }
                )
                if(admin )
                this.props.history.push('/Admin',this.state.name);
                else if(!admin && wrongData)
                this.props.history.push('/Employee',this.state.name);

            }
        )}
    }
    render(){
        return(
            <div className='container'>
                <div className='header'><h1 >Login</h1></div>
                
                <div className='box'>
                    <div className='subbox'>
                        <p>Name :&nbsp; </p>
                        <input style={{height:'30px',alignSelf:'center'}} type='text' onChange={this.changeName} />
                    </div>
                    <div className='subbox'>
                        <p>Password :&nbsp; </p>
                        <input style={{height:'30px',alignSelf:'center'}} type='password' onChange={this.changePass}/>
                    </div>
                    <div className='subbox'>
                        <button style={{width:'70px',height:'30px',justifyContent:'center'}} onClick={this.click}>Submit</button>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default Login;