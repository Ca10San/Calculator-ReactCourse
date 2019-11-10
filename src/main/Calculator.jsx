import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/Button'
import Display from '../components/Display';

//  this constant refers to initial state of application
//  values is an array to group the value that are in memory
const initialState = {
    displayValue: 0,
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component{

    state = {...initialState};

    constructor(props){
        super(props);

        this.clearMemory = this.clearMemory.bind(this);
        this.setOperator = this.setOperator.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory(){
        // this set the application to the initial state constant
        this.setState({...initialState});
    };

    setOperator(operator){
        if(this.state.current === 0){
            this.setState({operation: operator, current: 1, clearDisplay: true});
        }else{
            const currentOperation = this.state.operation;
            const values = this.state.values;

            const newValues = this.operatorCalc(currentOperation, ...values);
          
            this.setState({
                values: newValues, 
                clearDisplay: true, 
                current: 0, 
                displayValue: newValues[0],
                operation: operator
            });
        };
    };

    operatorCalc(operator, ...values){
        switch (operator) {
            case "*":
                values[0] = values[0] * values[1];
            break;

            case "+":
                values[0] = values[0] + values[1];
            break;

            case "-":
                values[0] = parseFloat(values[0]) - parseFloat(values[1]);
            break;

            case "/":
                values[0] = values[0] / values[1];
            break;

            default:
                return values;        
            
        }

        values[1] = 0;
        return values;
    }

    addDigit(n){
        if (n === '.' && this.state.displayValue.includes('.')){
            return;
        };

        // the value in display equals to 0 or this variable is false
        const clearDisplay = this.state.displayValue === 0 || this.state.clearDisplay;

        // if clearDisplay is true then clear display, if it's false receives the value in display instead
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = (currentValue === '0') ? 0 : currentValue + n;
        // não esquecer de tentar fazer isso com hook
        this.setState({displayValue, clearDisplay: false});

        if( n !== '.'){
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = this.state.values;
            values[i] = newValue;
            this.setState({values});
            console.log(values);
        }
    };

    render(){
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" operator triple click={this.clearMemory}/>
                <Button label="/" operator click={this.setOperator} />
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" operator click={this.setOperator} />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" operator click={this.setOperator} />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" operator click={this.setOperator} />
                <Button label="0" double click={this.addDigit} />
                <Button label="." click={this.addDigit}/>
                <Button label="=" operator click={this.setOperator}/>
            </div>
        );
    };
};