import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { InDrawerTable } from "./InDrawerTable";
import { dataFetcher } from "../../../features/dataFetcher";
import URL_LINKS from "../../../constants/urls";

interface PartAProps {
  handleDrawerLoading: (loading: boolean) => void;
  subthemeId: string;
  userId: string;
  projectId: string;
  rqConstructKey: string;
  dataSummary: string;
  dataPod: string;
  dataCompilation: string;
  showSuccess: (message: string) => void;
  showInfo: (message: string) => void;
  showError: (message: string) => void;
  showWarn: (message: string) => void;
}

const BAD_RESPONSES = [
  "ERR_BAD_RESPONSE",
  "ERR_EMPTY_RESPONSE",
  "ERR_CONNECTION_REFUSED",
  "ERR_CONNECTION_RESET",
  "ERR_CONNECTION_CLOSED",
  "ERR_CONNECTION_FAILED",
  "ERR_CONNECTION_TIMED_OUT",
  "ERR_CONNECTION_ABORTED",
  "ERR_NETWORK_CHANGED",
  "ERR_INTERNET_DISCONNECTED",
  "ERR_TUNNEL_CONNECTION_FAILED",
  "ERR_NAME_NOT_RESOLVED",
  "ERR_NAME_RESOLUTION_FAILED",
  "ERR_ADDRESS_UNREACHABLE",
  "ERR_ADDRESS_INVALID",
  "ERR_SSL_PROTOCOL_ERROR",
  "ERR_SSL_CLIENT_AUTH_CERT_NEEDED",
  "ERR_SSL_BAD_RECORD_MAC_ALERT",
  "ERR_SSL_UNSAFE_NEGOTIATION",
  "ERR_SSL_WEAK_SERVER_EPHEMERAL_DH_KEY",
  "ERR_SSL_VERSION_OR_CIPHER_MISMATCH",
  "ERR_SSL_RENEGOTIATION_REQUESTED",
  "ERR_CERT_COMMON_NAME_INVALID",
  "ERR_CERT_DATE_INVALID",
  "ERR_CERT_AUTHORITY_INVALID",
  "ERR_CERT_CONTAINS_ERRORS",
  "ERR_CERT_NO_REVOCATION_MECHANISM",
  "ERR_CERT_UNABLE_TO_CHECK_REVOCATION",
  "ERR_CERT_REVOKED",
  "ERR_CERT_INVALID",
  "ERR_CERT_END",
  "ERR_CERT_INVALID",
];
const PartA: React.FC<PartAProps> = ({
  handleDrawerLoading,
  subthemeId,
  userId,
  projectId,
  rqConstructKey,
  showSuccess,
  showInfo,
  showError,
  showWarn,
}) => {
  //data row selections
  const [selectedRows, setSelectedRows] = useState(null);


  const setterPodStatement = (podStatement: string) => {
    setPodStatement(podStatement);
  };

  const setterPodSummary = (podSummary: string) => {
    setPodSummary(podSummary);
  };


  const setterPodCompilation = (podCompilation: string) => {
    setPodCompilation(podCompilation);
  };


  const resetAll = () => {
    setPodStatement("");
    setPodSummary("");
    setPodCompilation("");
    setSelectedRows(null);
  };

  const [title, setTitle] = useState("Step Seven: Part A");
  const [tableData, setTableData] = useState([]);
  const [partAloading, setPartAloading] = useState(true);

  const [podStatement, setPodStatement] = useState('');
  const [podSummary, setPodSummary] = useState('');
  const [podCompilation, setPodCompilation] = useState('');

  useEffect(() => {
    async function fetchData() {
      setPartAloading(true);

      try {
        const subthemeUrl = URL_LINKS.SUBTHEME.value + subthemeId;
        const subthemeData = await dataFetcher(subthemeUrl);
        if (BAD_RESPONSES.includes(subthemeData.code)) {
          showError(subthemeData.message);
        } else {
          setTitle(subthemeData.data.description);
          setPodCompilation(subthemeData.data.subtheme_raw);
          setPodSummary(subthemeData.data.subtheme_40_summary);
          setPodStatement(subthemeData.data.subtheme_pod);
          showSuccess("Subtheme fetched successfully");
        }
      } catch (err) {
        showError(err.message);
      }

      try {
        const datatableUrl = URL_LINKS.DATATABLE.value + `${projectId}/${subthemeId}/${rqConstructKey}/${userId}`;
        const dataTableData = await dataFetcher(datatableUrl);
        if (dataTableData.status !== "success") {
          showError(dataTableData.message);
        } else {
          setTableData(dataTableData.data);
          showSuccess("Data table fetched successfully");
        }
      } catch (err) {
        showError(err.message);
      }

      setPartAloading(false);
    }

    fetchData();
  }, [subthemeId, userId, projectId, rqConstructKey, showError, showSuccess]);


  return (
    <>
      {partAloading ? (
        <div className="panel-body">
          <div className="container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      ) : (
        <div className="panel panel-info">
          <div className="panel-heading fill">
            <span className="panel-title">Subtheme : {title}</span>
          </div>
          <div className="panel-body">
            <div className="row"></div>
            <div className="row">
              
              <InDrawerTable 
              subthemeId={subthemeId}
              datatable={tableData}
              dataSummary={podSummary}
              dataPod={podStatement}
              dataCompilation={podCompilation}
              showSuccess={showSuccess}
              showInfo={showInfo}
              showError={showError}
              showWarn={showWarn}

              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PartA;
