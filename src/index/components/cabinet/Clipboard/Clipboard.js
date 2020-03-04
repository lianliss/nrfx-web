import React from 'react';
import * as UI from 'src/ui/index';
import { copyText } from 'src/actions/index';


export default props => (
  <UI.Clipboard skipIcon={props.skipIcon} className={props.className} onClick={copyText} text={props.text} />
)
