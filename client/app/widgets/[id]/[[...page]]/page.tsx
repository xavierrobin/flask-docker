import BackButton from '../../../../components/BackButton.js';
import Pagination from '../../../../components/Pagination';
import WidgetBs from '../../../../components/WidgetBs';
import Link from 'next/link';
import { headers } from 'next/headers';

async function getData(id: number, page: number) {
    const headersList = headers();
    const header_url = headersList.get('x-url') || "";
    const urlParams = new URLSearchParams(header_url);
    const urlPage = urlParams.get('page');
    console.log('url: ' + header_url);
    console.log(urlParams);


    if (page == null) {
        const res = await fetch(`http://host.docker.internal:8000/widget_data?widget_id=${id}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          return res.json();
    } else {
        const res = await fetch(`http://host.docker.internal:8000/widget_data?widget_id=${id}&page=${page}&per_page=10`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          return res.json();
    }
  }

async function WidgetPage({
    params, context
  }: {
    params: { id: number, page: number};
    context: any
  }) {
    const data = await getData(params.id, params.page);

    return (
    <div className="container">
        <BackButton />
        <h1 className="display-3 spacing-mt-2 mb-3">Widget history</h1>
        <blockquote className="text-xlarge text-secondary">
            <div>
                <p>Review all updates in reverse chronological order.</p>
            </div>
        </blockquote>
        {data && data.items.map((item: any) => (
          <div className="mb-2">
          <WidgetBs 
            name={item.name}
            latest_data={item}
          />
          </div>
        )
            
            )
            }
      <Pagination 
        nextPage={data && data._meta.page + 1}
      />
    </div>
    )
    ;
  }

  export default WidgetPage;
