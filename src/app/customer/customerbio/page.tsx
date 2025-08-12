'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

//scripts
import { UnitBio } from '@/types/customer';


export default function CustomerBioPage() {
  const [unit, setUnit] = useState<UnitBio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUnitBio = async () => {
      try {
        const response = await axios.get('/api/unitbio');
        setUnit(response.data);
      } catch {
        setError('Failed to load hotel unit bio.');
      } finally {
        setLoading(false);
      }
    };

    fetchUnitBio();
  }, []);

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-8 col-lg-6 mx-auto">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center p-4">
              <h2 className="card-title mb-3">About This Hotel Unit</h2>

              {loading && <div className="spinner-border text-primary" role="status" />}
              {error && <div className="alert alert-danger mt-3">{error}</div>}

              {unit && (
                <>
                  <h5 className="card-subtitle mb-2 text-muted">{unit.unitName}</h5>
                  <p className="card-text mt-3">{unit.description}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
