import { Suspense } from "react";
import WidgetBs from '../../../../components/WidgetBs.js'
import Team from '../../../../components/Team.jsx'
import Pods from '../../../../components/Pods.jsx'
import Loading from './loading.js'
import {entrypointServer} from '../../../../config/entrypoint';

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
    const res = await fetch(`${entrypointServer}/widgets?widget_type=overview&client_id=${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  async function getTeamByClientId(id: number) {
    const res = await fetch(`${entrypointServer}/teams/client/${id}`, { cache: 'no-store' });
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
    const teamData = getTeamByClientId(params.id);

    const [client, widgets, team] = await Promise.all([clientData, widgetsData, teamData]);

    return (
        <>
        <div>
            <h1 className="display-3 spacing-mt-2 mb-3">{client.data.name}</h1>
        </div>
        <div className="row mb-3">
          <div className="col-xl-5">
            <Team 
              banker={team.data.user_banker.email}
              sponsor={team.data.user_sponsor.email}
              deputy_sponsor={team.data.user_deputy_sponsor.email}
              nextgen={team.data.user_nextgen.email}
              />
          </div>
          <div className="col-xl-7">
            <Pods pods={client.data.pods} />
          </div>
        </div>
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

