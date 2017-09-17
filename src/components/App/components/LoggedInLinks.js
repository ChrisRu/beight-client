import React from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LogOut } from 'react-feather';
import { showLogoutModal } from '@/actions/modals';
import { handleEnter } from '@/services/accessibility';

const LoggedInLinks = ({ showLogoutModal, auth }) => (
  <div class="navigation">
    <NavLink tabIndex={0} role="link" exact to="/">
      <span tabIndex={-1}>Beight</span>
    </NavLink>
    <NavLink tabIndex={0} role="link" to="/games/manage">
      <span tabIndex={-1}>Manage</span>
    </NavLink>
    <NavLink tabIndex={0} role="link" to="/games/create">
      <span tabIndex={-1}>Create</span>
    </NavLink>
    <div class="pull-right">
      <a
        role="link"
        tabIndex={0}
        onClick={showLogoutModal}
        onKeyPress={handleEnter(showLogoutModal)}
      >
        <span tabIndex={-1}>
          <LogOut class="icon" />
          <span>{auth.username}</span>
        </span>
      </a>
    </div>
  </div>
);

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ showLogoutModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInLinks);
