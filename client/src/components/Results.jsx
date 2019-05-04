import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class Results extends Component {
    constructor(props){
        super(props);
        this.returnQuoteForm = this.returnQuoteForm.bind(this);
        this.changeView = this.changeView.bind(this);
        this.filterPrice = this.filterPrice.bind(this);
        this.filterName = this.filterName.bind(this);
        this.filterPolicy = this.filterPolicy.bind(this);
        this.resetData = this.resetData.bind(this);
        this.filterBestSeller = this.filterBestSeller.bind(this);
        this.filterSection = this.filterSection.bind(this);
        this.filterType = this.filterType.bind(this);
    }
    state = { 
        fireRedirect: false,
        data: undefined,
        table: true
     }
     componentDidMount = async e =>{
        const res = await axios.get('/quotes');
        const data = res.data;
        console.log(data.quotes);
        this.setState({
            data: data.quotes
        });

     }

    returnQuoteForm(){
        this.setState({
            fireRedirect: true
        });
    }

    changeView(){
        this.setState(prevState => ({
            table: !prevState.table
        }));
    }

    filterPrice(){
        console.log(this.state.data.sort(this.priceSort))
        this.setState({
            data: this.state.data.sort(this.priceSort)
        })
    }

    priceSort(a, b) {
        if( a.price < b.price){
            return -1;
        }
        if(a.price>b.price){
            return 1;
        }
        return 0;
    }

    filterName(){
        //this.resetData();
        this.setState({
            data: this.state.data.sort(this.nameSort)
        })
    }

    nameSort(a, b){
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }
        return 0;
    }

    filterBestSeller(){
        const bestSellers = this.state.data.filter(function (el){
            return el.bestSellers === true;
        })
       this.setState({
           data: bestSellers
       })
        
    }

   
 

    filterPolicy(event){
        event.preventDefault();
        if(event.target.elements.policy.value===""){
            this.resetData();
        }
        else if(this.resetData){
            if(parseInt(event.target.elements.policy.value)){
                var target  = parseInt(event.target.elements.policy.value);
                const policies = this.state.data.filter(function (el){
                return (el.price*1000) === target;
                })
                this.setState({
                    data: policies
                })
            }
            
        }
        
    }

    
    filterType(event){
        event.preventDefault();
        if(event.target.elements.type.value===""){
            this.resetData();
        }
        else if(this.resetData){
            var target  = event.target.elements.type.value;
            const types = this.state.data.filter(function (el){
            return el.type.toLowerCase() === target.toLowerCase();
            })
            this.setState({
                data: types
            })
        }

    }
    filterSection(event){
        event.preventDefault();
        if(event.target.elements.section.value===""){
            this.resetData();
        }
        else if(this.resetData){
            var target  = event.target.elements.section.value;
            const sections = this.state.data.filter(function (el){
            return el.section.toLowerCase() === target.toLowerCase();
            })
            this.setState({
                data: sections
            })
        }

    }
    
    resetData = async () =>{
        const res = await axios.get('/quotes');
        const data = res.data;
        console.log(data.quotes);
        this.setState({
            data: data.quotes
        });
    }


    render() { 
        return ( 
        <div className="resultPage">
            
            <h1>Results</h1>
            <div className="funcButtons">
                <button onClick={this.returnQuoteForm}>Home</button>
                <button onClick={this.changeView}>change view</button>
                <button onClick={this.filterPrice}>Price</button>
                <button onClick={this.filterName}>Name</button>
                <button onClick={this.filterBestSeller}>best seller</button>
                <div className="filterForms">
                    <form onSubmit={this.filterPolicy} className="policyForm">
                        <input type="text" name="policy" placeholder="e.g. 50000"></input>
                        <button>policy</button>
                    </form>
                    
                </div>
                <div>
                    <form onSubmit={this.filterType} className="policyForm">
                        <input type="text" name="type" placeholder="e.g. Fixed"></input>
                        <button>type</button>
                    </form>
                    
                </div>
                <div>
                    <form onSubmit={this.filterSection} className="policyForm">
                        <input type="text" name="section" placeholder="e.g. J1 Medical"></input>
                        <button>section</button>
                    </form>
                    
                </div>
            </div>
            
            {this.state.data && (
                 <div className="quoteTable">
                 <table style={{border: "0px solid black"}}>
                     <thead>
                         <tr>
                             <td>ID</td>
                             <td>Price</td>
                             <td>Name</td>
                             <td>Description</td>
                             <td>Type</td>
                             <td>Section</td>
                             <td>Best Sellers</td>
                         </tr>
                     </thead>
                     <tbody>
                        {this.state.data.map((quote,i) => {
                            return (
                                <tr key = {i}>
                                    <td>
                                        {quote.id}
                                    </td>
                                    <td>
                                        {quote.price*1000}
                                    </td>
                                    <td>
                                        {quote.name}
                                    </td>
                                    <td>
                                        {quote.description}
                                    </td>
                                    <td>
                                        {quote.type}
                                    </td>
                                        
                                    <td>
                                        {quote.section}
                                    </td>
                                    <td>
                                        {quote.bestSellers.toString()}
                                    </td>
                                </tr>
                            )
                        })}
                     </tbody>
                 </table>
             </div>
            ) 
            }
           
            {this.state.fireRedirect && (
                <Redirect to="/"/>
            )}
        </div> 
        );
    }
}
 
export default Results;