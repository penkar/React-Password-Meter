import React from 'react'
const Variable = ({title, id, description, change}) => (
  <tr key={title}>
    <td>{title}</td>
    <td><input id={id} onChange={change} /></td>
    <td>{description}</td>
  </tr>
);
export default Variable;
