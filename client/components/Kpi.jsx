'use client'
import CountUp from 'react-countup';
import { useState, useEffect, useRef } from 'react'
import { Tooltip } from 'bootstrap'

function Kpi(props) {

    const tooltipRef = useRef();
    const desc = props.description;
    useEffect(() => {
        var tooltip = new Tooltip(tooltipRef.current, {
            title: desc,
            placement: 'bottom',
            trigger: 'hover'
        })
    })

    return (
        <>
            <div className={`${(props.red == true && "text-danger") || props.amber == true && "text-warning" || props.green == true && "text-success"} pb-1`}>
                <h1 class="display-6 d-inline counter">
                    <CountUp 
                        end={props.value} 
                        prefix={props.prefix}
                        suffix={props.suffix}
                        decimals={props.decimals}
                        decimal="."
                      />
                        </h1>{' '}
                <p class="lead d-inline">{props.symbol}</p>
            </div>
            <p className="text-secondary fw-medium d-inline" ref={tooltipRef}>{props.name}</p>
        </>
    )
    };

export default Kpi;