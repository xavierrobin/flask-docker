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

    console.log("client impact:" + client.data.client_impact)
    return (
        <>
          <Suspense fallback={<Loading />}>
            <div>
                <h1 className="display-3 spacing-mt-2 mb-3">
                  {client.data.name}{' '}
                  {client.data.name = true && 
                    (
                      <span class="badge badge-outline-success badge-prepend-square">
                        Client Impact
                      </span>
                    )
                    }   
                
                </h1>
            
            </div>
            <div className="row mb-3">
              <div className="col-xl-6 mb-3">
                <Team 
                  banker={team.data.user_banker.email}
                  sponsor={team.data.user_sponsor.email}
                  deputy_sponsor={team.data.user_deputy_sponsor.email}
                  nextgen={team.data.user_nextgen.email}
                  />
              </div>
              <div className="col-xl-6 mb-3">
                <Pods pods={client.data.pods} />
              </div>
              {widgets && widgets.data.map((widget: Widget) => (
                  <div className="col-xl-6 mb-3">
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
            </div>
          </Suspense>
        </>
    );
  }

