import React from 'react';
import { useTranslation } from 'react-i18next';

//interface for the props
interface UserTypeProps {
  value: string;
  onChange: (val: string) => void;
}

export default function UserType({ value, onChange }: UserTypeProps) {
    const { t } = useTranslation();
  return (
    <div className="mb-4">
        <label htmlFor="type" className='form-label'>
            {t('selectType')}
        </label>
        <select id="type"
                className='form-select'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
        >
            <option value="" disabled>
                {t('selectType')}
            </option>
            <option value="customer">{t('customer')}</option>
            <option value="manager">{t('manager')}</option>
            <option value="chef">{t('chef')}</option>
            <option value="waiter">{t('waiter')}</option>
            <option value="admin">{t('admin')}</option>
            <option value="accountant">{t('accountant')}</option>
            <option value="owner">{t('owner')}</option>
        </select>
    </div>
  );
}
