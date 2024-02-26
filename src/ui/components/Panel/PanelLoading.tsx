import { Card } from 'primereact/card';
import '../../css/loading.css';

export function PanelLoading() {
  return (
    <Card>
      <div>
        <div className='container'>
          <div className='loading-spinner'></div>
        </div>
      </div>
    </Card>
  );
}

export default PanelLoading;
