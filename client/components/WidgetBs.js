import ModalBs from '../components/ModalBs.js'

function WidgetBs(props) {
    return (
    <div className="col">
        <div className="card card-bordered" key={props.id} >
        <div className="card-body">
            <h3 className="card-title">
            {props.name}
            <div className="float-end">
                <ModalBs 
                    widget_id={props.id} 
                    />
            </div>
            </h3>
            <p className="card-text mb-2">
            {props.latest_data
            ? props.latest_data.content
            : "No data yet."
            }
            </p>
            <p className="card-text">
            <small className="text-muted">
                { props.latest_data 
                ? "Last updated on " + props.latest_data.timestamp
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