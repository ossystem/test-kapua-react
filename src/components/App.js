import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';

import Modal from './Modal';
import { getTree, updateTree } from '../api';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      snapshotTree: [],
      treeData: [],
      error: '',
    };
  }

  componentDidMount() {
    getTree()
      .then(res => {
        let data = res.data;
        this.setState({treeData: data, snapshotTree: data});
      })
      .catch(data => { this.setState({error: data.message}); });
  }

  /**
   * @param {Object} type
   * 
   * @private
   */
  _onMoveNode = (info) => {
    updateTree(info)
      .then(() => { this.setState({snapshotTree: this.state.treeData}); } )
      .catch((data) => { this.setState({error: data.message, treeData: this.state.snapshotTree}); } );
  }

  /**
   * @param {Object}
   * 
   * @private
   */
  _generateNodeProps = ({ node }) => {
    return {
      buttons: [this._renderNode(node)]
    };
  }

  /**
   * @param {Object} node
   * 
   * @private
   */
  _renderNode = (node) => {
    return (<p className="custom-field">{node.test_field}</p>);
  }

  /**
   * 
   * @private
   */
  _renderTree = () => {
    const { treeData } = this.state;
    let component = null;

    if (treeData.length) {
      component = (
        <SortableTree
          treeData={treeData}
          onChange={data => {console.log('onChange', data); this.setState({ treeData: data })}}
          generateNodeProps={this._generateNodeProps}
          onMoveNode={this._onMoveNode}
        />
      );
    } else {
      component = (
        <div className="source-tree-app">
          <p>Kapua Application</p>
        </div>
      );
    }

    return component;
  }

  render() {
    const { error } = this.state;

    return (
      <div className="App">
        {this._renderTree()}
        <Modal message={error} onConfirm={() => { this.setState({error: ''}) }} />
      </div>
    );
  }
}

export default App;
