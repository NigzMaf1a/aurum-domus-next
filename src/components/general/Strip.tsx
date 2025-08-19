import React from "react";
import HeadL from "../h/HeadL";
import PL from "../p/PL"

//interface Strip props
import { StringOrNumber } from "@/types/customer";

interface StripProps{
    head:StringOrNumber;
    det: StringOrNumber;
}

export default function Strip({head, det}:StripProps) {
  return (
    <div className="col-lg-12 col-sm-6 mb-3 p-2 bg-primary rounded d-flex
                    flex-row"
         style={{height:"100px"}}
    >
        <div className="d-flex flex-column p-1">
            <HeadL text={head}/>
            <PL text={det}/>
        </div>
    </div>
  );
}