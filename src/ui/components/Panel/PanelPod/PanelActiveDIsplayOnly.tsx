import React from "react";

import DOMPurify from "dompurify";

interface PanelActiveDisplayOnlyProps {
    key: string;
    identifier: string;
    title: string;
    content: string;
    podIndicator: string;
}


const identifierIdTitleSetter = (identifier: string) => {
    switch (identifier) {
        case "1":
            return "filter_one_title";
        case "2":
            return "filter_two_title";
        case "3":
            return "filter_three_title";
        default:
            return "filter_one_title";
    }

};

const stripeTitleIfExceedLength = (title: string) => {
    if (title.length > 20) {
        return title.slice(0, 20) + "...";
    } else {
        return title;
    }
};

const PanelActiveDisplayOnly = ({
    key,
    identifier,
    title,
    content,
    podIndicator,
}: PanelActiveDisplayOnlyProps) => {
    // Function implementation goes here
    console.log('--- identifier ---');
    console.log(identifier);
    console.log('--- identifier ---');


    const dirty = content;
    const clean = DOMPurify.sanitize(dirty);
    let idIdentifier = identifierIdTitleSetter(identifier);

    return (
        <div className="panel panel-dark overflow-auto">
            <div className="panel-heading fill">
                <span className="panel-title" id={idIdentifier}>
                    {stripeTitleIfExceedLength(title)}
                </span>
                <div className="widget-menu pull-right mr10">
                    <span className="label bg-primary mr10">{podIndicator}</span>
                </div>
            </div>
            <div className="panel-body">
                <div className="p2" id={key}>
                    <div dangerouslySetInnerHTML={{ __html: clean }} />
                </div>
            </div>
            <div className="panel-footer"></div>
        </div>
    );



};

export default PanelActiveDisplayOnly;