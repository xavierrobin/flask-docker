import {entrypointServer} from '../../../../config/entrypoint';
import WidgetBs from '../../../../components/WidgetBs.js'
import Loading from '../strategy/loading.js'
import { Suspense } from "react";

interface Widget {
    id: number;
    name: string;
    widget_data: any;
  }

  interface Opportunity {
    id: number;
    product: string;
    sme: string;
    client: any;
  }
  
  async function getWidgets(id: number) {
    const res = await fetch(`${entrypointServer}/widgets?widget_type=opportunities&client_id=${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  async function getOpportunities(id: number) {
    const res = await fetch(`${entrypointServer}/opportunities/client/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  export default async function OpportunitiesPage({
    params
  }: {
    params: { id: number}
  }) {
    const opportunitiesData = getOpportunities(params.id);
    const widgetsData = getWidgets(params.id);

    const [opportunities, widgets] = await Promise.all([opportunitiesData, widgetsData]);

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
            {opportunities && opportunities.data.map((opportunity: Opportunity) => (
                <div className="col col-md-6 col-xl-6">
                  {opportunity.product} - {opportunity.sme}
                </div>
                )
                )              
                }


        </Suspense>
      </div>
    </>
    );
  }

