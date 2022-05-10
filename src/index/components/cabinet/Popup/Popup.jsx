import React from "react";

// Components
import CabinetBlock from "../CabinetBlock/CabinetBlock";

// Styles
import "./Popup.less";

function Popup ({children}) {
	return (
		<CabinetBlock className="Popup">
			{children}
		</CabinetBlock>
	);
}

export default Popup;