import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTruck, FaCheckCircle, FaBoxOpen, FaMapMarkerAlt } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '../assets/bosta-logo.png';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const TrackingComponent = ({ language, onLanguageChange }) => {
    const { t } = useTranslation(); // Initialize translation function
    const [selectedTrackingNumber, setSelectedTrackingNumber] = useState('84043113');
    const [shipmentData, setShipmentData] = useState(null);
    const [problemReporting, setProblemReporting] = useState(false);
    const [problemDescription, setProblemDescription] = useState('');

    // Fetch shipment data based on tracking number
    useEffect(() => {
        if (selectedTrackingNumber) {
            axios
                .get(`https://tracking.bosta.co/shipments/track/${selectedTrackingNumber}`)
                .then((response) => {
                    setShipmentData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data', error);
                    setShipmentData({ error: true });
                });
        }
    }, [selectedTrackingNumber]);

    const toggleProblemReporting = () => {
        setProblemReporting(!problemReporting);
    };

    const getProgressPercentage = () => {
        if (!shipmentData) return 0;

        const events = shipmentData.TransitEvents || [];
        const deliveredIndex = events.findIndex(event => event.state === 'DELIVERED');
        const outForDeliveryIndex = events.findIndex(event => event.state === 'OUT_FOR_DELIVERY');
        let lastValidIndex = deliveredIndex >= 0 ? deliveredIndex : (outForDeliveryIndex >= 0 ? outForDeliveryIndex : events.length - 1);
        const totalSteps = 4; // Shipment Created, Package Received, Out for Delivery, Delivered

        return ((lastValidIndex + 1) / totalSteps) * 100; 
    };

    const translateState = (state) => {
        switch (state) {
            case 'TICKET_CREATED':
                return t('ticketCreated');
            case 'PACKAGE_RECEIVED':
                return t('packageReceived');
            case 'IN_TRANSIT':
                return t('inTransit');
            case 'DELIVERY_FAILED':
                return t('deliveryFailed');
            case 'NOT_YET_SHIPPED':
                return t('notYetShipped');
            case 'AVAILABLE_FOR_PICKUP':
                return t('availableForPickup');
            case 'WAITING_FOR_CUSTOMER_ACTION':
                return t('waitingForCustomerAction');
            case 'CANCELLED':
                return t('cancelled');
            case 'OUT_FOR_DELIVERY':
                return t('outForDelivery');
            case 'DELIVERED_TO_SENDER':
                return t('deliveredToSender');
            case 'DELIVERED':
                return t('delivered');
            case 'N/A':
                return t('NA'); // Add translation for N/A
            default:
                return state; // Fallback to the original state if not found
        }
    };

    return (
        <div className="container-fluid mt-5" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {/* Full-width Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-danger w-100">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="Bosta Logo" style={{ width: '100px' }} />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/">{t('home')}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/contact">{t('contactUs')}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/login">{t('login')}</a>
                            </li>
                        </ul>
                        <LanguageSwitcher onLanguageChange={onLanguageChange} />
                    </div>
                </div>
            </nav>

            {/* Tracking Number Dropdown */}
            <div className="my-4">
                <label htmlFor="trackingNumber" className="form-label">{t('selectTracking')}</label>
                <select
                    id="trackingNumber"
                    className="form-select"
                    value={selectedTrackingNumber}
                    onChange={(e) => setSelectedTrackingNumber(e.target.value)}
                >
                    <option value="84043113">84043113</option>
                    <option value="3468570">3468570</option>
                    <option value="40106705">40106705</option>
                </select>
            </div>

            {/* Progress Bar for Shipment Stages */}
            <div className="my-4">
                <div className="progress">
                    <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: `${getProgressPercentage()}%` }}
                        aria-valuenow={getProgressPercentage()}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                </div>
            </div>

            {/* Progress Icons */}
            <div className="row text-center mb-4">
                <div className="col">
                    <div className={`progress-icon bg-${shipmentData?.TransitEvents[0]?.state ? 'danger' : 'secondary'} text-white rounded-circle d-flex align-items-center justify-content-center`} style={{ width: '50px', height: '50px', margin: '0 auto' }}>
                        <FaBoxOpen />
                    </div>
                    <p>{t('shipmentCreated')}</p>
                </div>
                <div className="col">
                    <div className={`progress-icon bg-${shipmentData?.TransitEvents[1]?.state ? 'danger' : 'secondary'} text-white rounded-circle d-flex align-items-center justify-content-center`} style={{ width: '50px', height: '50px', margin: '0 auto' }}>
                        <FaMapMarkerAlt />
                    </div>
                    <p>{t('packageReceived')}</p>
                </div>
                <div className="col">
                    <div className={`progress-icon bg-${shipmentData?.TransitEvents[2]?.state ? 'danger' : 'secondary'} text-white rounded-circle d-flex align-items-center justify-content-center`} style={{ width: '50px', height: '50px', margin: '0 auto' }}>
                        <FaTruck />
                    </div>
                    <p>{t('outForDelivery')}</p>
                </div>
                <div className="col">
                    <div className={`progress-icon bg-${shipmentData?.CurrentStatus?.state === 'DELIVERED' ? 'danger' : 'secondary'} text-white rounded-circle d-flex align-items-center justify-content-center`} style={{ width: '50px', height: '50px', margin: '0 auto' }}>
                        <FaCheckCircle />
                    </div>
                    <p>{t('delivered')}</p>
                </div>
            </div>

            {/* Shipment Details Table */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>{t('branch')}</th>
                            <th>{t('date')}</th>
                            <th>{t('time')}</th>
                            <th>{t('details')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipmentData?.TransitEvents && shipmentData.TransitEvents.length > 0 ? (
                            shipmentData.TransitEvents.map((event, index) => (
                                <tr key={index}>
                                    <td>{event.hub || t('NA')}</td>
                                    <td>{new Date(event.timestamp).toLocaleDateString()}</td>
                                    <td>{new Date(event.timestamp).toLocaleTimeString()}</td>
                                    <td>{translateState(event.state)}</td> {/* Use the translation function here */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">{t('noUpdates')}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Problem Reporting Section */}
            <div className="card mt-4 p-3">
                <h5>{t('problemReport')}</h5>
                <button className="btn btn-danger mt-2" onClick={toggleProblemReporting}>{t('reportProblem')}</button>

                {problemReporting && (
                    <div className="mt-3">
                        <textarea
                            className="form-control"
                            placeholder={t('describeProblem')}
                            value={problemDescription}
                            onChange={(e) => setProblemDescription(e.target.value)}
                        />
                        <button className="btn btn-primary mt-2">{t('submit')}</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackingComponent;
