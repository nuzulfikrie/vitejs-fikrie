//indrawer table component

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dataFetcher } from '../../../features/dataFetcher';
import URL_LINKS from '../../../constants/urls';

interface InDrawerTableProps {
    subthemeId: string;
    showAlertSuccessDrawer: (message: string) => void;
    showAlertErrorDrawer: (message: string) => void;
}

export function InDrawerTable(props: InDrawerTableProps) {

    const [subthemeId, setSubthemeId] = useState(props.subthemeId);
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
}