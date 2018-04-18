import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/index'

class CampaignIndex extends Component {
  componentWillMount() {
    this.props.fetchCampaigns();
  }
  render() {
    return (
      <div>
        <p>Success:{this.props.campaigns}</p>
        <p>Fail:{this.props.error.data}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    campaigns: state.campaigns.fetch_message,
    error: state.auth.error
  };
}
export default connect(mapStateToProps, actions)(CampaignIndex)
