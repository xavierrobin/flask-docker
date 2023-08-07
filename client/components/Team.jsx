function Team(props) {
    return (
        <>
            <div className="card card-bordered h-100">
                <div className="card-body">
                    <h3 className="card-title">
                        Team
                    </h3>
                    <table className="table table-sm table-condensed">
                        <tbody>
                            <tr>
                                <td>Banker</td>
                                <td>
                                    {props.banker 
                                        ? <span className="badge bg-primary">{props.banker}</span>
                                        : <span className="badge bg-secondary">N/A</span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Sponsor</td>
                                <td>
                                    {props.sponsor 
                                        ? <span className="badge bg-primary">{props.sponsor}</span>
                                        : <span className="badge bg-secondary">N/A</span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Deputy sponsor</td>
                                <td>
                                    {props.deputy_sponsor 
                                        ? <span className="badge bg-primary">{props.deputy_sponsor}</span>
                                        : <span className="badge bg-secondary">N/A</span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>NextGen</td>
                                <td>
                                    {props.nextgen 
                                        ? <span className="badge bg-primary">{props.nextgen}</span>
                                        : <span className="badge bg-secondary">N/A</span>
                                    }
                                </td>
                            </tr>                    
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
    };

export default Team;