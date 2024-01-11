import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';

class JournalDetailsComponent extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedProvider: null,
            // Add other state variables as needed
        };
    }

    handleProviderChange = (e) => {
        this.setState({ selectedProvider: e.value });
    }

    render() {
        const providers = [
            { label: 'ELSEVIER', value: 'elsevier' },
            { label: 'PUBMED', value: 'pubmed' },
            { label: 'IEEE', value: 'ieee' },
            { label: 'SPRINGER', value: 'springer' },
            { label: 'RESET', value: 'reset' },
        ];

        return (
            <div className="jconfirm-content">
                <Panel header="Journal Details" className="panel-danger mb40 mt5">
                    <form method="post" accept-charset="utf-8" id="editJournalForm" role="form" action="/courses/edit-journal-view/863/4155">
                        {/* Do not render hidden inputs for CSRF protection */}
                        {/* <input type="hidden" name="_method" value="POST" /> */}
                        {/* <input type="hidden" name="_csrfToken" value="e4635412c1688acea50ab3f39f8e18b3f6c7e57b9423443fea8489186b833039d54730f77c140805e647edc134a2fc68d0de4a4fe396ecb2d6652b4bd4023374" /> */}
                        <div className="panel-heading fill">
                            <span className="panel-title">Journal Details</span>
                        </div>
                        <div className="panel-body p20 pb10">
                            {/* Add your PrimeReact components here */}
                            <div className="col-md-8">
                                <div className="form-group text">
                                    <label htmlFor="doi">Doi</label>
                                    <InputText id="doi" name="doi" className="gui-input hasButton" />
                                </div>
                                <Button className="ui-doi-trigger btn-primary" label="Retrieve metadata" icon="pi pi-search" iconPos="right" />
                            </div>
                            <div className="col-md-8">
                                <div className="form-group text">
                                    <label htmlFor="author">Author</label>
                                    <InputText id="author" name="author" className="form-control" placeholder="In this format Karen Yang, David Martinez, Liza Beth" />
                                </div>
                            </div>
                            {/* Other form fields */}
                            <div className="col-md-8">
                                <div className="form-group text">
                                    <label htmlFor="year">Year</label>
                                    <InputText id="year" name="year" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="form-group text">
                                    <label htmlFor="journal-name">Journal Name</label>
                                    <InputText id="journal-name" name="journal_name" className="form-control" />
                                </div>
                            </div>
                            {/* Add more form fields */}
                            <div className="col-md-8">
                                <div className="form-group text">
                                    <label htmlFor="page">Page</label>
                                    <InputText id="page" name="page" className="form-control" />
                                </div>
                            </div>
                            {/* Dropdown for selecting provider */}
                            <div className="col-md-8">
                                <div className="form-group text">
                                    <label>SELECT PROVIDER</label>
                                    <Dropdown
                                        id="dropdown-button"
                                        value={this.state.selectedProvider}
                                        options={providers}
                                        onChange={this.handleProviderChange}
                                        placeholder="Select a provider"
                                    />
                                </div>
                            </div>
                            {/* Insert Template button */}
                            <div className="col-md-12">
                                <div className="btn-group">
                                    <Button className="insert-template btn-primary btn-md" label="Insert Template" />
                                </div>
                            </div>
                        </div>
                    </form>
                </Panel>
            </div>
        );
    }
}

export default JournalDetailsComponent;
