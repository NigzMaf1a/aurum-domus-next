import React, { ReactNode } from "react";

//components
import DynamicDiv from "./DynamicDiv";
import LabelledP from "../p/LabelledP";
import RoundedImage from "../images/RoundedImage";

interface DynamicDivProps {
  src: Blob | string;
  label1:string;
  label2:string;
  text1:string | number | undefined;
  text2:string | number | undefined;
  text3?:string | number;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function MinorDetails({
  src,
  label1,
  label2,
  text1,
  text2,
  children,
  onClick,
  className = "",
  style = {},
}: DynamicDivProps) {
  return (
    <>
        <div
        onClick={onClick}
        className={`d-flex flex-row justify-content-between align-items-center col-12 col-lg-12 col-sm-6 rounded border ${className}`}
        style={style}
        >
        <DynamicDiv className="d-flex flex-row align-items-center gap-2 ms-2"
                    style={{width:'300px'}}
        >
            <RoundedImage src={src} style={{height:'50px', width:'50px'}}/>
            <DynamicDiv>
                <LabelledP label={label1} text={text1}/>
                <LabelledP label={label2} text={text2}/>
            </DynamicDiv>
        </DynamicDiv>
        <DynamicDiv className="d-flex flex-column align-items-center justify-content-center me-2 px-1 py-1"
                    style={{width:'70px', backgroundColor:'#3EA99F'}}
        >
            {children}
        </DynamicDiv>
        </div>
    </>
  );
}