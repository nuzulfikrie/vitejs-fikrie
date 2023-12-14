//this will return the data sorting based on the key 'eagletable type'

export const parseDataForEagletable = (data: any) => {

    console.log('------------ parseDataForEagletable ------------');

    console.log(data);
};


export const getRqSortData = (key:string) => {
  switch (key) {
    case "master":
      return ["who", "what", "how"];

      case "2_how_how1_how2":
        return ["who", "what", "how_1", "how_2"];

        case "2_how_how2_how1":
        return ["who", "what", "how_2", "how_1"];

        case "2_how_what_how2":
        return ["who", "how_1", "what", "how_2"];

        case "2_how_what_how1":
        return ["who", "how_2", "what", "how_1"];

        case "2_what_what1_what2":
        return ["who", "what_1", "what_2", "how"];

        case "2_what_what2_what1":
        return ["who", "what_2", "what_1", "how"];

    default:
      break;
  }
};