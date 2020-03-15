import "./GAConfirmModal.less";

import React from "react";
import * as UI from "../../../../ui";

import * as utils from "../../../../utils";
import SVG from "react-inlinesvg";
import * as emitter from "../../../../services/emitter";

export default class GAConfirmModal extends React.Component {
  state = {
    gaCode: "",
    errorGaCode: false
  };

  __handleClose = () => {
    emitter.emit("ga_cancel");
    this.props.onClose();
  };

  __handleSubmit = () => {
    emitter.emit("ga_submit", { code: this.state.gaCode });
    this.props.onClose();
  };

  render() {
    return (
      <UI.Modal
        className="GAConfirmModal"
        isOpen={true}
        onClose={this.__handleClose}
        width={384}
      >
        <UI.ModalHeader>
          {utils.getLang("cabinet_ga_modal_name")}
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    );
  }

  __renderContent() {
    return (
      <div>
        <UI.Input
          autoFocus={true}
          type="code"
          cell
          mouseWheel={false}
          autoComplete="off"
          value={this.state.gaCode}
          onTextChange={this.__handleChange}
          placeholder={utils.getLang("site__authModalGAPlaceholder")}
          error={this.state.errorGaCode}
          indicator={<SVG src={require("../../../../asset/google_auth.svg")} />}
        />
        <div className="GAConfirmModal__submit_wrapper">
          <UI.Button
            onClick={this.__handleSubmit}
            disabled={this.state.gaCode.length < 6}
          >
            {utils.getLang("cabinet_settingsSave")}
          </UI.Button>
        </div>
      </div>
    );
  }

  __handleChange = val => {
    if (val.length < 6) {
      this.setState({ gaCode: val });
    } else if (val.length === 6) {
      this.setState({ gaCode: val }, () => {
        this.__handleSubmit();
      });
    }
  };
}

GAConfirmModal.defaultProps = {
  params: {
    onChangeHandler: () => {}
  }
};
