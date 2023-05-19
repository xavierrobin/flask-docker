import {entrypointServer} from '../../../../config/entrypoint';
import WidgetBs from '../../../../components/WidgetBs.js'
import Loading from './loading.js'
import { Suspense } from "react";

interface Widget {
    id: number;
    name: string;
    widget_data: any;
  }

async function getClientById(id: number) {
    const res = await fetch(`${entrypointServer}/clients/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }
  
  async function getWidgets(id: number) {
    const res = await fetch(`${entrypointServer}/widgets?widget_type=strategy&client_id=${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  export default async function StrategyPage({
    params
  }: {
    params: { id: number}
  }) {
    const clientData = getClientById(params.id);
    const widgetsData = getWidgets(params.id);

    const [client, widgets] = await Promise.all([clientData, widgetsData]);

    return (
    <>
      <div className="row row-cols-1 row-cols-md-3">
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
    </>
    );
  }

