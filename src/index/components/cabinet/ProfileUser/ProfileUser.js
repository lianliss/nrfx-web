import './ProfileUser.less';

import React from 'react';
import { connect } from 'react-redux';

import * as modalGroupActions from '../../../../actions/modalGroup';
import UploadAvatarModal from '../UploadAvatarModal/UploadAvatarModal';
import SVG from 'react-inlinesvg';
import * as utils from '../../../../utils';

const ProfileSidebarUser = ({profile}) => {
  if (!profile || !Object.keys(profile).length) {
    return null;
  }

  return (
    <div className="ProfileUser">
      <div className="ProfileUser__avatar__wrap" onClick={() => {
        modalGroupActions.openModalPage('upload_avatar', {}, {
          children: UploadAvatarModal
        })
      }}>
        <div className="ProfileUser__avatar__over">
          <SVG src={require("../../../../asset/24px/camera.svg")} />
        </div>
        <img className="ProfileUser__avatar blur" src={profile.user.photo_url} alt="" />
        <img className="ProfileUser__avatar" src={profile.user.photo_url} alt="" />
      </div>
      <div className="ProfileUser__description">
        <h3 className="ProfileUser__title">
          <span>{utils.ucfirst(profile.user.first_name)} {utils.ucfirst(profile.user.last_name)}</span>
          { profile.verification === "verified" && <SVG className="ProfileUser__verified" src={require('src/asset/16px/verified.svg')} /> }
        </h3>
        <p className="ProfileUser__txt">{profile.user.login}</p>
        <p className="ProfileUser__txt">{profile.role}</p>
        {/*<UI.Button*/}
        {/*  onClick={() => {*/}
        {/*    actions.openModal('verification');*/}
        {/*  }}*/}
        {/*  className="ProfileUser__verifyButton"*/}
        {/*  size="small"*/}
        {/*  type="negative"*/}
        {/*>{utils.getLang('global_verify')}</UI.Button>*/}
      </div>
    </div>
  )
}

export default connect(
  state => ({ profile: state.default.profile })
)(ProfileSidebarUser);
