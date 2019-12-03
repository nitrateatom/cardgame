import React from 'react';

import { Table } from 'react-bootstrap'

class MessageContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style = {{height: '200px', overflowY: 'scroll'}}>
         <Table striped hover>
        <tbody>
          {/* {this.props.reduxTLItems.map( message =>
            <tr key={JSON.stringify(message)}>
              <td className="name-column">{message.user}</td>
              <td>{message.messageVal}</td>
            </tr>
          )} */}
          {this.props.messages.map( message =>
            <tr key={message.key}>
              <td className="name-column">{message.name}</td>
              <td>{message.msg}</td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* <div style = {{marginLeft: '30px'}}>
        {this.props.reduxTLItems.map(tli => (
          <MessageIndividual item={tli} />
        ))}
      </div> */}
      </div>
    );
  }
}

export default MessageContainer
