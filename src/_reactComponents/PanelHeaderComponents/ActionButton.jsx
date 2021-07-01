import React from 'react';
import styled, { ThemeProvider, css } from "styled-components";

const Button = styled.button`
  margin: ${props => props.theme.margin};
  height: 24px;
  border-style: solid;
  border-color: black;
  border-width: 2px;
  color: black;
  background-color: #FFF;
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.padding};
  cursor: pointer;
  font-size: 12px
 ;
`

Button.defaultProps = {
  theme: {
    margin: "0",
    borderRadius: "5px",
    padding: '0px 10px 0px 10px'
  }
}


export default function ActionButton(props) {
  //Assume small
  var actionButton = {
        value: 'Action Button',
      };
  if (props.width) {
    if (props.width === "menu") {
      actionButton.width = '235px'}
  }
  var icon = '';
  if (props.value || props.icon){
    if (props.value && props.icon){
        icon = props.icon;
        actionButton.value = props.value
    }
    else if (props.value){
        actionButton.value = props.value
    }
    else if (props.icon){
        icon = props.icon;
        actionButton.value = ''
    }
}
  if (props.num === 'first') {
    actionButton.borderRadius = '5px 0px 0px 5px'
  }
  if (props.num === 'last') {
    actionButton.borderRadius = '0px 5px 5px 0px'
  }
  function handleClick() {
    if (props.callback) props.callback()
  }
  //TODO handleClick() is not defined
    return (
        <>
            <Button id="actionButton" style={actionButton} onClick={() => { handleClick() }}>{icon}{' '}{actionButton.value}</Button>
        </>
    )
}