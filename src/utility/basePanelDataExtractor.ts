//this file extracts data
// Path: src/utility/basePanelDataExtractor.ts
// Define the structure of your data
interface data {
    status: string;
    message: string;
    is_article: boolean;
    key: string;
    course_id: number;
    rqConstructSet: {
        [key: string]: string;
    };
    subthemeList: {
        [key: string]: Subtheme[];
    };
    completedB: {
        [key: string]: completedB[];
    };
    dataStepSeven: {
        [key: string]: {
            construct_definition: string;
            subtheme_count: number;
            subtheme_data: Subtheme[];
        };
    };
    eagletable_type: string;
}
interface completedB {
    //just array of booleans
    [key: string]: boolean;
};

interface Subtheme {
    subtheme_description: string;
    subtheme_id: number;
    flag_subtheme_complete: boolean;
    course_subtheme_count: number;
}

// 1 - get eagletable type return string
// Function to get eagletable type
export const getEagletableType = (data: data): string => {
  return data.eagletable_type;
};

// 2 - get rqConstructSet return object

// Function to get rqConstructSet
export const getRqConstructSet = (data: data): object => {
  return data.rqConstructSet;
};

// 3 - get subthemeList return object
export const getSubthemelist = (data: data): object => {
  return data.subthemeList;
};

//4 Get completedB return object
export const getCompletedB = (data: data): object => {
  return data.completedB;
};
