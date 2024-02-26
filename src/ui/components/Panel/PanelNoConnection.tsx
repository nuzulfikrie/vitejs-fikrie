import { Card } from 'primereact/card';

export function PanelNoConnection() {
  return (
    <Card>
      <div>
        <h1>
          <i className='fa-solid fa-globe' style={{ color: 'red' }}></i> No
          Connection
        </h1>
      </div>
    </Card>
  );
}

export default PanelNoConnection;
