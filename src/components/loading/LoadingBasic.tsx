import React from 'react';

//components
import GlobalModal from '../modals/GlobalModal';
import DynamicDiv from '../containers/DynamicDiv';
import DynamicP from '../p/DynamicP';

export default function LoadingBasic() {
  return (
    <GlobalModal>
        <DynamicDiv className="text-center my-4 bg-light"
                    style={{width:'100px', height:'100px'}}
        >
          <DynamicP text={"Loading..."}/>
        </DynamicDiv>
    </GlobalModal>
  );
}
