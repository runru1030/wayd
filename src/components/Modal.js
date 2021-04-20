import React, { Component } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state =
    {
      isOpenMoal: false,
    };

  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isOpenMoal: false
      })
    }
    else {
      this.setState({
        isOpenMoal: true,
      })
    }
  }

  render() {
    return <div ref={this.setWrapperRef} className="modal">{!this.state.isOpenMoal && <FontAwesomeIcon id="modalLabel" icon={faEllipsisV} />}{this.state.isOpenMoal && this.props.children}</div>;
  }
}