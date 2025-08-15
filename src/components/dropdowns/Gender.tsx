import React from 'react';
import { useTranslation } from 'react-i18next';

//Gender props interface
interface GenderProps{
    value:string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function Gender({value, onChange}:GenderProps) {
  const { t } = useTranslation();
  return (
    <div className="mb-3">
        <label htmlFor="gender" className="form-label">{t('gender')}</label>
            <select
              id="gender"
              name="gender"
              className="form-select"
              value={value}
              onChange={onChange}
              required
            >
                <option value="" disabled>{t('selectGender')}</option>
                <option value="male">{t('male')}</option>
                <option value="female">{t('female')}</option>
            </select>
    </div>
  )
}