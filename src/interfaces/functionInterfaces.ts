export interface NoParamNoReturn{
    callback: () => void;
}

export interface ParamStringNoReturn{
    callback: (param:string) => void; 
}
