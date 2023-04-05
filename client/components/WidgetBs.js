import ModalBs from '../components/ModalBs.js'
import Link from 'next/link';

function WidgetBs(props) {
    return (
    <div className="col">
        <div className="card card-bordered" key={props.id} >
        <div className="card-body">
        {props.history && props.history == 'true' && (
            <h3 className="card-title">
            {props.name}
                <>
                    <div className="float-end d-inline">
                        <ModalBs 
                            widget_id={props.id} 
                            />
                    </div>
                    <div className="float-end d-inline">
                        <Link href={"/widgets/" + props.id}>
                            <i className="icon text-muted">history</i>
                        </Link>
                    </div>
                </>
                </h3>
            )}
            <p className="card-text mb-2">
            {props.latest_data
            ? props.latest_data.content
            : "No data yet."
            }
            </p>
            <p className="card-text">
            <small className="text-muted">
                { props.latest_data 
                ? "Updated on " + props.latest_data.timestamp
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