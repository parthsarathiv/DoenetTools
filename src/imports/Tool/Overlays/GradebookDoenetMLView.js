import React, { useEffect } from "react";
import {specificAttemptData } from "../../../Tools/DoenetGradebook"
import {
    atom,
    RecoilRoot,
    useSetRecoilState,
    useRecoilState,
    useRecoilValue,
    selector,
    atomFamily,
    selectorFamily,
    useRecoilValueLoadable,
    useRecoilStateLoadable,
  } from "recoil";

export default function GradebookDoenetMLView(props){
    let assignmentId = props.assignmentId;
    let userId = props.userId;
    let attemptNumber = props.attemptNumber;
    let specificAttempt = useRecoilValueLoadable(specificAttemptData({assignmentId, userId, attemptNumber}))
    if(specificAttempt.state == 'hasValue'){
        return(<div>
            <p>{specificAttempt.contents.doenetML}</p>
        </div>)
    }else{
        return(<>
            <p>{specificAttempt.state}</p>
        </>)
    }
}