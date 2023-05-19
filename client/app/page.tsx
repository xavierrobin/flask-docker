import {entrypointServer} from '../config/entrypoint';
import WidgetBs from '../components/WidgetBs';

interface Widget {
  id: number;
  name: string;
  widget_data: any;
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
    </main>
  )
}

export default Home