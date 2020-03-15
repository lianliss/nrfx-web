import { ABOUT, HISTORY, MISSION } from "../../../constants/pages";
import * as utils from "../../../../utils";

export const data = {
  get misssionInfo() {
    return {
      route: MISSION,
      title: utils.getLang("site__aboutFixturesMissionTitle"),
      caption: utils.getLang("site__aboutFixturesMissionSubTitle"),
      icon: require("./asset/mission_icon.svg")
    };
  },

  get historyInfo() {
    return {
      route: HISTORY,
      title: utils.getLang("site__aboutFixturesMapRoadTitle"),
      caption: utils.getLang("site__aboutFixturesMapRoadSubTitle"),
      icon: require("./asset/history_icon.svg")
    };
  },

  get aboutInfo() {
    return {
      route: ABOUT,
      title: utils.getLang("site__aboutFixturesAboutUsTitle"),
      caption: utils.getLang("site__aboutFixturesAboutUsSubTitle"),
      icon: require("./asset/about_icon.svg")
    };
  },

  get timelineData() {
    return [
      {
        title: utils.getLang("site__aboutFixturesTimelineTitle1"),
        description: utils.getLang("site__aboutFixturesTimelineSubTitle1")
      },
      {
        title: utils.getLang("site__aboutFixturesTimelineTitle2"),
        description: utils.getLang("site__aboutFixturesTimelineSubTitle2")
      },
      {
        title: utils.getLang("site__aboutFixturesTimelineTitle3"),
        description: utils.getLang("site__aboutFixturesTimelineSubTitle3")
      },
      {
        title: utils.getLang("site__aboutFixturesTimelineTitle4"),
        description: utils.getLang("site__aboutFixturesTimelineSubTitle4")
      },
      {
        title: utils.getLang("site__aboutFixturesTimelineTitle5"),
        description: utils.getLang("site__aboutFixturesTimelineSubTitle5")
      },
      {
        title: utils.getLang("site__aboutFixturesTimelineTitle6"),
        description: utils.getLang("site__aboutFixturesTimelineSubTitle6")
      },
      {
        title: utils.getLang("site__aboutFixturesTimelineTitle7"),
        description: utils.getLang("site__aboutFixturesTimelineSubTitle7")
      },
      {
        title: utils.getLang("site__aboutFixturesTimelineTitle8"),
        description: utils.getLang("site__aboutFixturesTimelineSubTitle8")
      },
      {
        title: utils.getLang("site__aboutFixturesTimelineTitle9"),
        description: utils.getLang("site__aboutFixturesTimelineSubTitle9")
      },
      {
        title: utils.getLang("site__aboutFixturesTimelineTitle10"),
        description: utils.getLang("site__aboutFixturesTimelineSubTitle10")
      }
    ];
  }
};
