import React from "react"
import ReactDOM from "react-dom"
import {hot} from "react-hot-loader"
import "../styles/ScoreTable.css"

const Modal = (props) => {
  return (
    props.modalOpen ?
      ReactDOM.createPortal(
      <div className="modal-overlay" onClick={props.modalClose}>
        <div className="modal-div" onClick={props.modalClose}>
          {props.children}
          <hr />    
          <button onClick={props.modalClose}>Close</button>  
        </div>
      </div>,
      document.body
    ) : null
  )
}

export default hot (module)(Modal)