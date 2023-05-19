import { pods_list } from '../config/pods'

function Pods(props) {
    return (
        <>
            <div className="card card-bordered">
                <div className="card-body">
                    <h3 className="card-title">
                        Pods
                    </h3>
                    <p className="text-secondary text-small">The following pods have been identified for this client. Please contact the pod sponsor for specific targeting needs.</p>
                    <hr />
                    <table className="table table-sm table-condensed">
                        <tbody>

                        {pods_list.map((pod, index) => {
                        const isPodFound = props.pods.includes(pod.pod_value);
                        return (
                        <tr key={index}>
                            <td>{pod.pod_name}</td>
                            <td>{isPodFound ? <span className="badge bg-success">Yes</span> : <span className="badge bg-danger">No</span>}</td>
                                <td>
                                <div class="d-flex flex-wrap justify-content-start gap-1">
                                {isPodFound ? (
                                    <>
                                    {pod.pod_sponsors.map((sponsor, index) => (
                                        <span className="badge bg-primary" key={index}>{sponsor.name}</span>
                                      ))}
                                    </>
                                      ) : (
                                        <span className="badge bg-secondary">N/A</span>
                                      )}
                                </div>
                            </td>
                        </tr>
                        )})}
           
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
    };

export default Pods;