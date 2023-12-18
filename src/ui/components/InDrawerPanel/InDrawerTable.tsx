import React, { useState, useEffect } from "react";
import {
    DataTable,
    DataTableSelectEvent,
    DataTableUnselectEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { purifyDom } from "../../../utility/domPurifyUtil";
import { Card } from "primereact/card";
import { InputSwitch } from "primereact/inputswitch";
import { Divider } from "primereact/divider";
import PodSummary from "./PodSummary";
import PartAPodStatement from "./PartAPodStatement";
import PodCompilation from "./PodCompilation";

interface InDrawerTableProps {
    subthemeId: string;
    datatable: any;
    dataSummary: string;
    dataPod: string;
    dataCompilation: string;
    showSuccess: (message: string) => void;
    showInfo: (message: string) => void;
    showError: (message: string) => void;
    showWarn: (message: string) => void;
}

export function InDrawerTable(props: InDrawerTableProps) {
    const {
        subthemeId,
        datatable,
        showSuccess,
        dataSummary,
        dataPod,
        dataCompilation,
        showInfo,
        showError,
        showWarn,
    } = props;

    const [selectedRows, setSelectedRows] = useState([]);
    const [rowClick, setRowClick] = useState(true);

    const htmlBodyTemplate = (data: { string_data: any }) => {
        const safeHTML = purifyDom(data.string_data);
        return <span dangerouslySetInnerHTML={{ __html: safeHTML }}></span>;
    };


    const submitPodData = () => {
        /**
         * active_rq_construct
: 
"who"
active_rq_subtheme
: 
"2111"
pod_40
: 
"<p><span id=\"4593\" class=\"pod_text\" style=\"color: #003399;\"><span id=\"4581\" class=\"pod_text\" style=\"color: #003399;\"><span id=\"12036\" class=\"pod_text\" style=\"color: #003399;\">Therefore based on Beth (1234) my study will focus on.</span>Therefore based on Yusoff et al., (2014) my study will focus on the built environment factors that hinders the elderly from actively participate in economic, cultural, spiritual and civic affairs in Malaysia..</span>Therefore based on author (2017) my study will focus on.</span><span id=\"5929\" class=\"pod_text\" style=\"color: #003399;\">Therefore based on Ozorhon (2017) my study will focus on.edit here test&nbsp;</span></p>"
pod_raw
: 
"<p><span id=\"4593\" class=\"pod_text\" style=\"color: #003399;\"><span id=\"12036\" class=\"pod_text\" style=\"color: #003399;\">Therefore based on Beth (1234) my study will focus on.</span>Therefore based on author () my study will focus on.</span><span id=\"4581\" class=\"pod_text\" style=\"color: #003399;\">Therefore based on Yusoff et al., (2014) my study will focus on the built environment factors that hinders the elderly from actively participate in economic, cultural, spiritual and civic affairs in Malaysia..</span><span id=\"5929\" class=\"pod_text\" style=\"color: #003399;\">Therefore based on Ozorhon (2017) my study will focus on.</span></p>"
pod_summary
: 
"<p><span id=\"4581\" class=\"pod_text\" style=\"color: #003399;\"><span id=\"12036\" class=\"pod_text\" style=\"color: #003399;\">Therefore based on Beth (1234) my study will focus on.</span>Based on Yusoff et al., (2014) my study will focus on the built environment factors that hinders the elderly from actively participate in economic, cultural, spiritual and civic affairs in Malaysia.</span><span id=\"5929\" class=\"pod_text\" style=\"color: #003399;\">Therefore based on Ozorhon (2017) my study will focus on.fsdffds edit POD compilation</span></p>"
selections
: 
[4735, 4737, 7796]
validation
: 
true
         */
    };

    const htmlExtractByClass = (data: { string_data: string }) => {
        let className = "pod_text";
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(data.string_data, "text/html");
        let elements = htmlDoc.getElementsByClassName(className);
        let element = elements[0];
        let elementContent = element.innerHTML;
        return elementContent;
    };

    useEffect(() => {
        const initialSelectedRows = datatable.filter(item => item.is_checked);
        setSelectedRows(initialSelectedRows);
    }, []);

    const onRowSelect = (event: DataTableSelectEvent) => {
        showSuccess(event.data.article_title + " selected");
    };

    const onRowUnselect = (event: DataTableUnselectEvent) => {
        showWarn(event.data.article_title + " unselected");
    };

    return (
        <>
            <div className="card">
                <div className="flex justify-content-center align-items-center mb-4 gap-2">
                    <InputSwitch
                        inputId="input-rowclick"
                        checked={rowClick}
                        onChange={(e) => setRowClick(e.value)}
                    />
                    <label htmlFor="input-rowclick">Row Click</label>
                </div>
                <DataTable
                    value={datatable}
                    selectionMode={rowClick ? "multiple" : "checkbox"}
                    selection={selectedRows}
                    onSelectionChange={(e: any) => setSelectedRows(e.value)}
                    dataKey="id"
                    onRowSelect={onRowSelect}
                    onRowUnselect={onRowUnselect}
                    metaKeySelection={false}
                    tableStyle={{ minWidth: "50rem" }}
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3rem" }}
                    ></Column>
                    <Column header="String Data" body={htmlBodyTemplate} />
                </DataTable>
            </div>
            <Card title="POD Statement" subTitle="POD Statement">
                <PartAPodStatement dataPartAPodStatement={dataPod} />
            </Card>
            <Divider layout="vertical" />
            <Card title="Compilation" subTitle="Compilation">
                <PodCompilation dataCompilation={dataCompilation} />
            </Card>
            <Divider type="solid" />
            <Card title="Summary" subTitle="Summary">
                <PodSummary podSummaryText={dataSummary} />
            </Card>
        </>
    );
}