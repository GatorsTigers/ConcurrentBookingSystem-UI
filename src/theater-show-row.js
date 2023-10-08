import React from 'react';

const format_date = (date) => {
    return date.getHours() + ':' + date.getMinutes();
}

const Theater = ({ name }) => {
    return (
        <div className="theater-style">
            <h2>{name}</h2>
        </div>
    )
}

const Show = ({ showId, startTime, endTime }) => {
    return (
        <div className="show">
            <h4>{showId}</h4>
            <p>{format_date(startTime)} to {format_date(endTime)}</p>
        </div>
    )
}

export const TheaterShow = ({ theaterName, showDetails }) => {
    return (
        <div className="theater-show-container">
            <Theater name={theaterName} />
            {
                showDetails.map((show, i) => (
                    <Show key={i} showId={show.showId} startTime={show.startTime} endTime={show.endTime} />
                ))
            }
        </div>
    )
}

export default TheaterShow;
