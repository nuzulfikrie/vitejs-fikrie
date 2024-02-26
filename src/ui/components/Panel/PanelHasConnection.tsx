import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';

export const PanelHasConnection = (): JSX.Element | null => {
  const [showPanel, setShowPanel] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPanel(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return showPanel ? (
    <Card>
      <div>
        <h1>
          <i className='fa-solid fa-globe' style={{ color: 'green' }}></i>{' '}
          Connected
        </h1>
      </div>
    </Card>
  ) : null;
};

export default PanelHasConnection;
