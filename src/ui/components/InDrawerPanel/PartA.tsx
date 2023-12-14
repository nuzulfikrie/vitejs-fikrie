import React, { useEffect, useLayoutEffect, useState } from "react";
import { dataFetcher } from "../../../features/dataFetcher";
import URL_LINKS from "../../../constants/urls";
interface PartAProps{
    subthemeId: string;
    showAlertSuccessDrawer: (message: string) => void;
    showAlertErrorDrawer: (message: string) => void;
};

const fetchSubtheme = async (subthemeId: string) => {
    const url = URL_LINKS.SUBTHEME.value + subthemeId;
    try {
        const data = await dataFetcher(url);
        return data;
    } catch (err) {
        // Handle or log the error as needed

        return err;
    }
};

const setTitle = (title: string) => {

    if(!title){
        return 'Step Seven: Part A';
    }

    return 'Step Seven: Part A - ' + title;
};

const BAD_RESPONSES = [
    'ERR_BAD_RESPONSE',
    'ERR_EMPTY_RESPONSE',
    'ERR_CONNECTION_REFUSED',
    'ERR_CONNECTION_RESET',
    'ERR_CONNECTION_CLOSED',
    'ERR_CONNECTION_FAILED',
    'ERR_CONNECTION_TIMED_OUT',
    'ERR_CONNECTION_ABORTED',
    'ERR_NETWORK_CHANGED',
    'ERR_INTERNET_DISCONNECTED',
    'ERR_TUNNEL_CONNECTION_FAILED',
    'ERR_NAME_NOT_RESOLVED',
    'ERR_NAME_RESOLUTION_FAILED',
    'ERR_ADDRESS_UNREACHABLE',
    'ERR_ADDRESS_INVALID',
    'ERR_SSL_PROTOCOL_ERROR',
    'ERR_SSL_CLIENT_AUTH_CERT_NEEDED',
    'ERR_SSL_BAD_RECORD_MAC_ALERT',
    'ERR_SSL_UNSAFE_NEGOTIATION',
    'ERR_SSL_WEAK_SERVER_EPHEMERAL_DH_KEY',
    'ERR_SSL_VERSION_OR_CIPHER_MISMATCH',
    'ERR_SSL_RENEGOTIATION_REQUESTED',
    'ERR_CERT_COMMON_NAME_INVALID',
    'ERR_CERT_DATE_INVALID',
    'ERR_CERT_AUTHORITY_INVALID',
    'ERR_CERT_CONTAINS_ERRORS',
    'ERR_CERT_NO_REVOCATION_MECHANISM',
    'ERR_CERT_UNABLE_TO_CHECK_REVOCATION',
    'ERR_CERT_REVOKED',
    'ERR_CERT_INVALID',
    'ERR_CERT_END',
    'ERR_CERT_INVALID',
    
];
const PartA: React.FC<PartAProps> = ({ subthemeId,showAlertSuccessDrawer,showAlertErrorDrawer}) => {
    const [title, setTitle] = useState('Step Seven: Part A');
    const [tableData,setTableData] = useState([]);

    useEffect(() => {

        const dataSubtheme = async (subthemeId: string) => {
            const url = URL_LINKS.SUBTHEME.value + subthemeId;
            try {
                const data = await dataFetcher(url);

                //check if code is in bad responses
                if (BAD_RESPONSES.includes(data.code)) {
                  
                    showAlertErrorDrawer(data.message);
                    data.data.description = null;
                }

                showAlertSuccessDrawer('Subtheme fetched successfully');

                 setTitle(data.data.description);

                return data;
                
            } catch (err) {
                showAlertErrorDrawer(err.message);
            }

        };

        dataSubtheme(subthemeId); // Call the async function

    }, [subthemeId]); // Don't forget to add dependencies here

    return (
        <div className="panel panel-info">
            <div className="panel-heading fill">
                <span className="panel-title">{title}</span>
            </div>
            <div className="panel-body">
                <div className="row">
                
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2>Part A</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartA;