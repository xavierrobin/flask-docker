import BackButton from '../../../../components/BackButton.js';
import Pagination from '../../../../components/Pagination';
import WidgetBs from '../../../../components/WidgetBs';
import { headers } from 'next/headers';

async function getData(id: number) {
  const headersList = headers();
  const header_url = headersList.get('x-url') || "";
  const url = new URL(header_url);
  const searchParams = url.searchParams;
  const page = searchParams.get('page')
  console.log(page)
    if (page == null) {
        const res = await fetch(`http://host.docker.internal:8000/widget_data?widget_id=${id}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          return res.json();
    } else {
        const res = await fetch(`http://host.docker.internal:8000/widget_data?widget_id=${id}&page=${page}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          return res.json();
    }
  }

async function WidgetPage({
    params
  }: {
    params: { id: number}
  }) {
    const headersList = headers();
    const header_url = headersList.get('x-url') || "";
    const url = new URL(header_url);
    const searchParams = url.searchParams;
    const page = searchParams.get('page')
    const data = await getData(params.id);

    return (
    <div className="container">
        <BackButton />
        <h1 className="display-3 spacing-mt-2 mb-3">Widget history</h1>
        <blockquote className="text-xlarge text-secondary">
            <div>
                <p>Review all updates in reverse chronological order.</p>
            </div>
        </blockquote>
        {data && data.data.map((item: any) => (
          <div className="mb-2">
          <WidgetBs 
            name={item.name}
            latest_data={item}
          />
          </div>
        )            
            )
            }
        {data && (data.data.length === 0) && 'No data.'}

      <Pagination 
        currentPage={page}
        totalPages={data && data._meta.total_pages}
      />
    </div>
    )
    ;
  }

  export default WidgetPage;
