import React from 'react';
import { useTranslation } from 'react-i18next';

//interface for RegType props
interface RegProps{
    value:string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function RegType({value, onChange}:RegProps) {
  const { t } = useTranslation();
  return (
    <div className="mb-4">
        <label htmlFor="regType" className="form-label">{t('registrationType')}</label>
            <select
              id="regType"
              name="regType"
              className="form-select"
              value={value}
              onChange={onChange}
              required
            >
              <option value="" disabled>{t('selectRole')}</option>
              <option value="admin">{t('admin')}</option>
              <option value="manager">{t('manager')}</option>
              <option value="customer">{t('customer')}</option>
            </select>        
    </div>
  )
}