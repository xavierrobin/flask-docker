import {entrypointServer} from '../config/entrypoint';
import WidgetBs from '../components/WidgetBs';
import Kpi from '../components/Kpi';

interface Widget {
  id: number;
  name: string;
  widget_data: any;
}

interface Kpi {
  prefix: string;
  value: any;
  suffix: string;
  symbol: string;
  red: boolean;
  amber: boolean;
  green: boolean;
  description: string;
  name: string;
}

async function getWidgets() {
  const res = await fetch(`${entrypointServer}/widgets?widget_type=general_news`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function Home({}) {
  const data = await getWidgets();
  console.log(data)
  return (
    <main className="container-fluid">
      {data && data.data.map((widget: Widget) => (
        <WidgetBs 
          id={widget.id} 
          name={widget.name}
          latest_data={widget.widget_data[0]}
          history='true'
          />
        )

      )}
      <div className="mt-3">
        <Kpi
            prefix="#"
            value="23"
            suffix=""
            decimals="0"
            symbol="m€"
            red={false}
            amber={false}
            green={true}
            description="Description du KPI"
            name="Budget YTD 23 vs. 22"
          />
      </div>
    </main>
  )
}

export default Home