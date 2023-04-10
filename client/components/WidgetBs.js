import ModalBs from '../components/ModalBs.js'
import Link from 'next/link';
import moment from 'moment';

function WidgetBs(props) {
    return (
    <div>
        <div className="card card-bordered" key={props.id} >
        <div className="card-body">
        {props.history && props.history == 'true' && (
            <div className='row'>
                <div className='col-9'>
                    <h3 className="card-title">
                        {props.name}
                    </h3>
                </div>
                <div className='col-3'>
                    <div className='float-end d-inline'>
                            <ModalBs 
                                widget_id={props.id}
                                client_id={props.client_id}
                                icon={true}
                                />
                            <Link href={"/widgets/" + props.id + '?page=1&client_id=' + props.client_id}>
                                <i className="icon text-muted">history</i>
                            </Link>
                    </div>
                </div>
            </div>
            )
            }
            
            {props.latest_data && props.latest_data.content !== ''
                ? (
                    <div dangerouslySetInnerHTML={{ 
                        __html: props.latest_data.content
                    }} />
                )
                : <div className="card-text mb-2 text-muted">No data yet. <ModalBs widget_id={props.id} client_id={props.client_id} icon={false} toggleText={'Add data'}
                />
                    </div>
                }
            
            <p className="card-text mt-2">
            <small className="text-muted">
                { props.latest_data 
                ? "Updated on " + moment(props.latest_data.timestamp).format('MMMM Do YYYY [at] h:mma')
                : "No update yet."
                }
            </small>
            </p>
        </div>
        </div>
    </div>
  );
}

export default WidgetBs;