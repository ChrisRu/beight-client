import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LogIn, UserPlus } from 'react-feather';
import { showLoginModal, showSignupModal } from '@/actions/modals';
import { handleEnter } from '@/services/accessibility';

const LoggedOutLinks = ({ showLoginModal, showSignupModal }) => (
  <div class="navigation">
    <NavLink exact to="/">
      <span tabIndex={-1}>Beight</span>
    </NavLink>
    <div class="pull-right">
      <a
        role="button"
        tabIndex={0}
        onClick={showLoginModal}
        onKeyPress={handleEnter(showLoginModal)}
      >
        <span tabIndex={-1}>
          <LogIn class="icon" />
          <span>Log In</span>
        </span>
      </a>
      <a
        role="button"
        tabIndex={0}
        onClick={showSignupModal}
        onKeyPress={handleEnter(showSignupModal)}
      >
        <span tabIndex={-1}>
          <UserPlus class="icon" />
          <span>Sign Up</span>
        </span>
      </a>
    </div>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showLoginModal, showSignupModal }, dispatch);

export default connect(null, mapDispatchToProps)(LoggedOutLinks);
