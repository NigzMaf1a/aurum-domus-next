import React from 'react';
import { useTranslation } from 'react-i18next';

//components
import DynamicDiv from '@/components/containers/DynamicDiv';
import LabelledP from '@/components/p/LabelledP';

//interfaces
import StockItem from '@/interfaces/stockItem';
interface ManagerStockProps{
    stock:StockItem[];
}

export default function ManagerStock({props}:{props:ManagerStockProps}) {
    const {t} = useTranslation();
  return (
      <DynamicDiv style={{ maxHeight: '500px', overflowY: 'auto' }} className="mb-4">
        <DynamicDiv className="row g-3">
          {props.stock.map(item => (
            <DynamicDiv key={item.StockID} className="col-12">
              <DynamicDiv className="card shadow-sm">
                <DynamicDiv className="card-body">
                  <h5>{t('stockId')}: {item.StockID}</h5>
                  <LabelledP label={t('itemName')} text={item.ItemName}/>
                  <LabelledP label={t('itemDescription')} text={item.ItemDescription}/>
                  <LabelledP label={t('quantity')} text={item.Quantity}/>
                  <LabelledP label={t('costPerUnit')} text={item.Cost.toFixed(2)}/>
                  <LabelledP label={t('total')} text={item.Total.toFixed(2)}/>
                </DynamicDiv>
              </DynamicDiv>
            </DynamicDiv>
          ))}
        </DynamicDiv>
      </DynamicDiv>
  )
}