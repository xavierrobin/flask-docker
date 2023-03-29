import WidgetBs from '../components/WidgetBs.js'


interface Widget {
  id: number;
  name: string;
  latest_data: any;
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
          {data && data.items && data.items.map((widget: Widget) => (
            <WidgetBs 
              id={widget.id}
              name={widget.name}
              latest_data={widget.latest_data}
              />
              )
              )              
            }
      </div>
    </main>
  )
}

export default Home