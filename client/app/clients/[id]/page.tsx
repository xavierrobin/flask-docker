import { Suspense } from "react";
import WidgetBs from '../../../components/WidgetBs.js'
import Loading from './loading.js'

interface Widget {
    id: number;
    name: string;
    widget_data: any;
  }

async function getClientById(id: number) {
    const res = await fetch(`http://host.docker.internal:8000/clients/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }
  
  async function getWidgets(id: number) {
    const res = await fetch(`http://host.docker.internal:8000/widgets?client_id=${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  export default async function ClientPage({
    params
  }: {
    params: { id: number}
  }) {
    const clientData = getClientById(params.id);
    const widgetsData = getWidgets(params.id);

    const [client, widgets] = await Promise.all([clientData, widgetsData]);

    return (
    <main className="container">

        <div className="">
            <h1 className="display-3 spacing-mt-2 mb-3">{client.data.name}</h1>
            <h1></h1>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
            <Suspense fallback={<Loading />}>
                {widgets && widgets.data.map((widget: Widget) => (
                    <div className="col col-md-6 col-xl-6">
                    <WidgetBs 
                    id={widget.id}
                    name={widget.name}
                    client_id={params.id}
                    latest_data={widget.widget_data[0]}
                    history='true'
                    />
                    </div>
                    )
                    )              
                    }
            </Suspense>

        </div>
    </main>
    );
  }

