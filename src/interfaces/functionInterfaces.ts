export interface NoParamNoReturn{
    callback: () => void;
}

export interface TwoFuncNoParamNoReturn{
    callback1: () => void;
    callback2: () => void;
}

export interface ParamStringNoReturn{
    callback: (param:string) => void; 
}
