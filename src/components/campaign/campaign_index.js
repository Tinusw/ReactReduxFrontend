import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/index'

class CampaignIndex extends Component {
  componentWillMount() {
    this.props.fetchCampaigns();
  }

  renderItems(){
    return this.props.campaigns.map((item) => {
      return (
        <div key={item.id}>id: {item.id} - name: {item.name} </div>
      )
    })
  }

  render() {
    if(!this.props.campaigns){
      return <div>Loading...</div>
    }

    return (
      <div>
        <h4>successfull fetch shows up here</h4>
        --------------------------------------
        {this.renderItems()}
        --------------------------------------
        <h4>Fails show up here (errors from API)</h4>
        --------------------------------------
        {this.props.error.data}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    campaigns: state.campaigns.collection,
    error: state.auth.error
  };
}
export default connect(mapStateToProps, actions)(CampaignIndex)
