import React, { useEffect } from "react";
import Tool from "../Tool";
import { useToolControlHelper } from "../ToolRoot";

export default function Calendar({ contentId, doenetId }) {
  useEffect(() => {
    //init code here
    // console.log(">>>Cal Init");
    return () => console.log(">>>Cal exit"); //cleanup code here
  }, []);

  return (
    <Tool isOverlay>
      <headerPanel></headerPanel>

      <mainPanel>
        This is the calendar on doenetId: {doenetId} with content: {contentId}
      </mainPanel>

      <supportPanel></supportPanel>

      <menuPanel title={"actions"}></menuPanel>
    </Tool>
  );
}
