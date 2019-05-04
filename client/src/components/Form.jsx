import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class Form extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    state = {  
        startDate: undefined,
        endDate: undefined,
        policy: undefined,
        citizenship: undefined,
        age: undefined,
        mailing: undefined,
        errMsg: undefined,
        fireRedirect: false,
        quotes: undefined
    }

    //handle input change
    handleChange(event){
        //console.log(event.target.value);
        //console.log(event.target.id);

        
    }

    handleSubmit(event) {   
       event.preventDefault();
       console.log('handle submit')
       if(this.validate(event)){
           this.redirectResults();
       } 
      
       
    }

    redirectResults() {
        this.setState({
            fireRedirect: true,
        });
    }

    validate(event){
        let errors = []
         //call is empty to check if all fields filled out
       if(!(event.target.citizen.value && event.target.mailing.value && event.target.age.value
        && event.target.startDate.value && event.target.endDate.value && event.target.policy.value)){
            errors.push(<p>Please fill out all fields </p>);
            this.setState({
            errMsg: errors
            });
            return false
        }

        var letters = /^[A-Za-z]+$/;
        
        //check if citizenship and mailing are letters
        if(!event.target.elements.citizen.value.match(letters)){
            errors.push(<p>Please use letters only for citizenship </p>);
        }
        if(!event.target.elements.mailing.value.match(letters)){
            errors.push(<p>Please use letters only for mailing state </p>);
        }
        const ageValue = parseInt(event.target.elements.age.value);
        if(ageValue>1000){
            const userDate = new Date(event.target.elements.age.value).getFullYear()+1;
            const currDate = new Date().getFullYear();
            if((currDate-userDate)>100){
                errors.push(<p>Please Enter Valid Age </p>);
            }
        }
        if(ageValue>100 && ageValue<1000){
            errors.push(<p>Please Enter Valid Age </p>);
        }
        if(errors.length>0){
            this.setState({
                errMsg: errors
            })
            return false
        }
        return true;
    }

    isEmpty(event){
        if(event.target.elements.citizen===""){
            return false;
        }else{
            return true;
        }
   
    }
    
    handleReset(event){
        event.preventDefault();
        console.log("handle reset");
        document.getElementById("quoteFields").reset();
        this.setState({
            errMsg: ""
        });
    }

    

    render() { 
       
        return ( 
            <div className="quoteForm">
                <div className="quoteTitle">
                <p>
                    Travel Insurance
                </p>
                </div>
                
                <form className="form" onSubmit={this.handleSubmit} id="quoteFields">
                   <div className="form1">
                        <div className="form2">
                            <div className="policy">
                                Policy Max: 
                                <select id="policy" value={this.state.policy} onChange={this.handleChange}>
                                    <option value="50">50,000</option>
                                    <option value="100">100,000</option>
                                    <option value="150">250,000</option>
                                    <option value="200">500,000</option>
                                </select>
                            </div>
                            <div className="travel">
                                Travel Dates (mm/dd/yyy):
                                <div className="date">
                                    <input id="startDate" type="date" value={this.state.startDate} onChange={this.handleChange}></input>
                                    <input type="date" id="endDate" value={this.state.endDate} onChange={this.handleChange}></input>
                                </div>
                            </div>
                            <div className="mail">
                                Mailing State: <input id="mailing" type="text" value={this.state.mailing} onChange={this.handleChange} placeholder="Enter Mailing State"></input>
                            </div>
                        </div>

                        <div className="form3">
                            <div className="age">
                                Age/Birth Year: <input name="age" id="age" type="number" value={this.state.age} onChange={this.handleChange} placeholder="Enter Age or Birth Year"></input>
                            </div>
                            <div className="citizen">
                                Citizenship: <input 
                                    name="citizen"
                                    id="citizen" 
                                    type="text" 
                                    value={this.state.citizenship} 
                                    onChange={this.handleChange} 
                                    placeholder="Enter Citizenship"></input>
                            </div>
                        </div>
                   </div>
                   <div>
                   <div className="errors">
                    {this.state.errMsg}
                   </div>
                  
                   </div>
                   <div className="Button">
                        
                        <div className="searchBtn">
                            <button>GET QUOTES</button>
                        </div>
                        <div className="resetBtn">
                            <button onClick={this.handleReset} className="reset">Reset Form</button>
                        </div>
                    
                        
                    </div>
                </form>
                {this.state.fireRedirect && (
                    <Redirect to={{pathname:"/results", }}/>
                )}
            </div>
         );
    }
}
 
export default Form;
