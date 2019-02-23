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
          {props.message}
          <hr />
          <button onClick={props.modalSubmit}>Do It</button>  
          <button onClick={props.modalClose}>Cancel</button>  
        </div>
      </div>,
      document.body
    ) : null
  )
}

export default hot (module)(Modal)