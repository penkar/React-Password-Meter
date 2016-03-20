// var React = require('react');
import React from 'react'

class Variable extends React.Component{
  render(){
    let vars = this.props.vars;
    return (
      <tr>
        <td>{vars.title}</td>
        <td><input id={vars.id} onChange={::this.props.change} /></td>
        <td>{vars.description}</td>
      </tr>
    )
  }
}

export default Variable;
