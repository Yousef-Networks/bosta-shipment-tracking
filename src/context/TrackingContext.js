
import React, { createContext, useState } from 'react';

const TrackingContext = createContext();

const TrackingProvider = ({ children }) => {
    const [shipmentData, setShipmentData] = useState(null);

    return (
        <TrackingContext.Provider value={{ shipmentData, setShipmentData }}>
            {children}
        </TrackingContext.Provider>
    );
};

export { TrackingContext, TrackingProvider };
