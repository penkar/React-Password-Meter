// var React = require('react');
import React from 'react'

class VariableRow extends React.Component{
  render(){
    return (
      <tr>
        <td>Capital Letters</td>
        <td><input id="capLetters" onChange={this.change} /></td>
      </tr>
    )
  }
}

export default VariableRow;
// module.exports = VariableRow;
