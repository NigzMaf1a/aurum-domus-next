'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import axios from 'axios';                       // Live API disabled in mock mode
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//components
import Skeleton from '@/components/containers/Skeleton';

import mockDishes from '../../../utilscripts/mockDishes.json';

// Interfaces/enums/scripts
import Dish from '../../../interfaces/dish';

const ManagerDishesPage: React.FC = () => {
  /* ---------- State ---------- */
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  // Form fields
  const [dishName, setDishName] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [dishPrice, setDishPrice] = useState<number>(0);
  const [available, setAvailable] = useState<'YES' | 'NO'>('YES');

  // Dummy UnitID 
  const unitID = 1;

  /* ---------- Fetch (mock) ---------- */
  const fetchDishes = async () => {
    /* 
    try {
      const res = await axios.get('/api/managerdishes');
      setDishes(res.data);
    } catch {
      alert('Failed to load dishes.');
    } finally {
      setLoading(false);
    }
    */

    // MOCK MODE
    setDishes(mockDishes as Dish[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  /* ---------- Add Dish ---------- */
  const handleAddDish = async () => {
    if (!dishName.trim() || dishPrice <= 0) {
      alert('Please provide a valid dish name and price.');
      return;
    }

    /* 
    try {
      const newDish = {
        UnitID: unitID,
        DishName: dishName.trim(),
        DishDescription: dishDescription.trim(),
        DishPrice: dishPrice,
        Available: available
      };
      await axios.post('/api/managerdishes', newDish);
      await fetchDishes();
      setShowModal(false);
    } catch {
      alert('Error adding dish.');
    }
    */

    // MOCK SUCCESS
    const newDish: Dish = {
      DishID: dishes.length ? Math.max(...dishes.map(d => d.DishID)) + 1 : 1,
      UnitID: unitID,
      DishName: dishName.trim(),
      DishDescription: dishDescription.trim(),
      DishPrice: dishPrice,
      Available: available
    };
    setDishes(prev => [...prev, newDish]);
    setShowModal(false);

    // Reset form
    setDishName('');
    setDishDescription('');
    setDishPrice(0);
    setAvailable('YES');
  };

  /* ---------- UI ---------- */
  return (
    <Skeleton className="container py-4">
      <h2 className="text-center mb-4 textColorless">{t('managerDishes')}</h2>

      {loading ? (
        <p className="text-center text-muted">{t('loading')}</p>
      ) : (
        <>
          {/* Scrollable dish list */}
          <div className="overflow-auto mb-3" style={{ maxHeight: '60vh' }}>
            {dishes.length === 0 ? (
              <p className="text-center text-muted">{t('noDishes')}</p>
            ) : (
              dishes.map(dish => (
                <div key={dish.DishID} className="card mb-3 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{dish.DishName}</h5>
                    <p className="card-text mb-1">
                      <strong>{t('dishDescription')}:</strong> {dish.DishDescription || '—'}
                    </p>
                    <p className="card-text mb-1">
                      <strong>{t('price')}:</strong> {t('kshs')} {dish.DishPrice.toFixed(2)}
                    </p>
                    <p className="card-text">
                      <strong>{t('available')}:</strong>{' '}
                      <span
                        className={`badge ${
                          dish.Available === 'YES' ? 'bg-success' : 'bg-danger'
                        }`}
                      >
                        {dish.Available}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add dish button */}
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              {t('addDish')}
            </button>
          </div>
        </>
      )}

      {/* ---------- Modal ---------- */}
      <div
        className="modal fade"
        id="addDishModal"
        tabIndex={-1}
        aria-labelledby="addDishModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        {/* Intentionally left out. Triggered manually */}
      </div>
      {/* Using React‑Bootstrap style modal manually for parity with earlier pages */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addDishModalLabel">
                  {t('addDish')}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">{t('dishName')}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={dishName}
                      onChange={e => setDishName(e.target.value)}
                      placeholder="e.g. Chicken Biryani"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{t('dishDescription')}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={dishDescription}
                      onChange={e => setDishDescription(e.target.value)}
                      placeholder="Optional short description"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{t('dishPrice')}</label>
                    <input
                      type="number"
                      className="form-control"
                      value={dishPrice}
                      onChange={e => setDishPrice(Number(e.target.value) || 0)}
                      min={1}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{t('available')}</label>
                    <select
                      className="form-select"
                      value={available}
                      onChange={e =>
                        setAvailable(e.target.value as 'YES' | 'NO')
                      }
                    >
                      <option value="YES">{t('yes')}</option>
                      <option value="NO">{t('no')}</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  {t('cancel')}
                </button>
                <button className="btn btn-success" onClick={handleAddDish}>
                  {t('saveDish')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Skeleton>
  );
};

export default ManagerDishesPage;
