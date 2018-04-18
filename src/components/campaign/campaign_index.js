import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/index'

class CampaignIndex extends Component {
  componentWillMount() {
    this.props.fetchCampaigns();
  }
  render() {
    return (
      <div>{this.props.campaigns}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    campaigns: state.campaigns.fetch_message
  };
}
export default connect(mapStateToProps, actions)(CampaignIndex)
