import React from "react";
import HeadL from "../h/HeadL";
import PL from "../p/PL"

//interface Strip props
import { StringOrNumber } from "@/types/customer";
import DynamicDiv from "../containers/DynamicDiv";

interface StripProps{
    head:StringOrNumber;
    det: StringOrNumber;
}

export default function Strip({head, det}:StripProps) {
  return (
    <DynamicDiv className="col-lg-12 col-sm-6 mb-3 p-2 rounded d-flex
                    flex-row align-items-center"
         style={{height:"100px", backgroundColor:"#387C44"}}
    >
        <DynamicDiv className="d-flex flex-column p-1">
            <HeadL text={head}/>
            <PL text={det}/>
        </DynamicDiv>
    </DynamicDiv>
  );
}