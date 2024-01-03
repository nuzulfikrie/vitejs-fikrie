// Define the structure of the data based on the JSON provided
type FortyWordSummary = {
    id: string;
    key: string;
    item_identifier: number;
    subtheme_identifier: number | string;
    title_of_summary: string;
    forty_word_summary: string;
    completed: string;
};

type SubthemeDetails = {
    subtheme_description: string;
    subtheme_id: number;
    flag_subtheme_complete: boolean;
    course_subtheme_count: number;
};

type SubthemeList = {
    who: SubthemeDetails[];
    what: SubthemeDetails[];
    how: SubthemeDetails[];
};

type CompletedStatus = {
    who: boolean;
    what: boolean;
    how: boolean;
};

type SummaryData = {
    [key: number]: {
        id:string;
        key:string;
        title: string;
        forty_word_summary: string;
    };
};


type RawData = {
    status: string;
    message: string;
    data: {
        [key: string]: any;
        title: string;
        subtheme_list: SubthemeList;
        subtheme_count: number;
        completed: CompletedStatus;
    };
};

class DataLibrary {
    private rawData: RawData;

    constructor(rawData: RawData) {
        this.rawData = rawData;
    }

    // Retrieve the main data
    getMainData() {
        return this.rawData.data;
    }

    getTitle(): string {
        return this.rawData.data.title;
    };

    getSubthemeCount(): number {
        return this.rawData.data.subtheme_count;
    };

    // Retrieve the summaries
    getFortyWordSummaries(): FortyWordSummary[] {
        const summaries: FortyWordSummary[] = [];
        Object.entries(this.rawData.data).forEach(([key, value]) => {
            if (!isNaN(Number(key))) {
                summaries.push(value as FortyWordSummary);
            }
        });
        return summaries;
    }

    // Retrieve the subtheme list
    getSubthemeList(): SubthemeList {
        return this.rawData.data.subtheme_list;
    }

    // Retrieve the completion status
    getCompletionStatus(): CompletedStatus {
        return this.rawData.data.completed;
    }

    // Method to retrieve summaries with item_identifier as key
    getSummariesByKey(): SummaryData {
        const summariesByKey: SummaryData = {};
        Object.entries(this.rawData.data).forEach(([key, value]) => {
            if (!isNaN(Number(key))) {
                const summary = value as FortyWordSummary;
                summariesByKey[summary.item_identifier] = {
                    id: summary.id,
                    key: summary.key,
                    title: summary.title_of_summary,
                    forty_word_summary: summary.forty_word_summary
                };
            }
        });
        return summariesByKey;
    }
}

export default DataLibrary;