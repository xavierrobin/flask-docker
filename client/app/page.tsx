import WidgetBs from '../components/WidgetBs.js'


interface Widget {
  id: number;
  name: string;
  widget_data: any;
}

async function getData() {
  const res = await fetch('http://host.docker.internal:8000/widgets', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function Home({}) {
  const data = await getData();

  return (
    <main className="container-fluid">
      <div className="row row-cols-1 row-cols-md-3 g-4">
          {data && data.data.map((widget: Widget) => (
            <div className="col col-md-6 col-xl-6">
            <WidgetBs 
              id={widget.id}
              name={widget.name}
              latest_data={widget.widget_data[0]}
              history='true'
              />
            </div>
              )
              )              
            }
      </div>
    </main>
  )
}

export default Home