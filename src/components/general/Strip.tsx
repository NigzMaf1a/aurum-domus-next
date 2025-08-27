import React from "react";
import HeadL from "../h/HeadL";

//interface Strip props
import { StringOrNumber } from "@/types/customer";
import DynamicDiv from "../containers/DynamicDiv";

interface StripProps{
    head:StringOrNumber;
    det?: StringOrNumber;
}

export default function Strip({head}:StripProps) {
  return (
    <DynamicDiv className="col-lg-12 col-sm-6 mb-3 p-2 rounded d-flex
                    flex-row align-items-center justify-content-center"
         style={{height:"50px", backgroundColor:"#387C44"}}
    >
        <DynamicDiv className="d-flex flex-column p-1">
            <HeadL text={head}/>
        </DynamicDiv>
    </DynamicDiv>
  );
}