import PanelActive from "../Panel/PanelPod/PanelActive";
import PanelLoading from "./PanelPod/PanelLoading";
import PanelAllDark from "./PanelPod/PanelAllDark";
import PanelNotCompleted from "./PanelPod/PanelNotCompleted";
import PanelError from "./PanelPod/PanelError";

interface PanelBodyProps {
  data: object;
  subthemeCount: number;
  loading: boolean;
  deleteDataClick: (item_id: string, identifier: string, content: string) => void;
  editDataClick: (item_id: string, identifier: string, title: string, content: string) => void;
  addData: (identifier: string, title: string, content: string) => void;
  error: string | null;
}
type DataItem = {
  title: string;
  content: string;
  key: string;
};

type DataObject = {
  key: string;
  title: string;
  construct: string;
  subtheme_count: number;
  items: DataItem[];
};

type SummaryItem = {
  id: number;
  key: number;
  title: string;
  forty_word_summary: string;
};

type SummaryData = {
  [key: string]: SummaryItem;
};

type ExtractedData = {
  titles: string[];
  summaries: string[];
  keys: string[];
};

type extractedData = {
  titles: string[];
  summaries: string[];
  keys: string[];
};

const dataExtractor = (data: object): ExtractedData => {
  const titles: string[] = [];
  const summaries: string[] = [];
  const keys: string[] = [];

  Object.values(data).forEach((item) => {
    titles.push(item.title);
    summaries.push(item.forty_word_summary);
    keys.push(item.key);
  });

  return { titles, summaries, keys };
};

// Now use storedData instead of the data prop

const PanelBody: React.FunctionComponent<PanelBodyProps> = ({
  data,
  subthemeCount,
  loading,
  deleteDataClick,
  editDataClick,
  addData,
  error,
}) => {
  const extractedData = dataExtractor(data);

  let title1 = extractedData.titles[0];
  let content1 = extractedData.summaries[0];
  let title2 = extractedData.titles[1];
  let content2 = extractedData.summaries[1];
  let title3 = extractedData.titles[2];
  let content3 = extractedData.summaries[2];
  let title4 = extractedData.titles[3];
  let content4 = extractedData.summaries[3];
  let title5 = extractedData.titles[4];
  let content5 = extractedData.summaries[4];
  let title6 = extractedData.titles[5];
  let content6 = extractedData.summaries[5];
  let title7 = extractedData.titles[6];
  let content7 = extractedData.summaries[6];
  let title8 = extractedData.titles[7];
  let content8 = extractedData.summaries[7];
  let title9 = extractedData.titles[8];
  let content9 = extractedData.summaries[8];

  let key1 = extractedData.keys[0];
  let key2 = extractedData.keys[1];
  let key3 = extractedData.keys[2];
  let key4 = extractedData.keys[3];
  let key5 = extractedData.keys[4];
  let key6 = extractedData.keys[5];
  let key7 = extractedData.keys[6];
  let key8 = extractedData.keys[7];
  let key9 = extractedData.keys[8];
  let content1Empty = content1 === "" || content1 === null;
  let Content2Empty = content2 === "" || content2 === null;
  let Content3Empty = content3 === "" || content3 === null;
  let Content4Empty = content4 === "" || content4 === null;
  let Content5Empty = content5 === "" || content5 === null;
  let Content6Empty = content6 === "" || content6 === null;
  let Content7Empty = content7 === "" || content7 === null;
  let Content8Empty = content8 === "" || content8 === null;
  let Content9Empty = content9 === "" || content9 === null;

  {
    /* get add button disable status  */
  }
  const getAddButtonDisable = (identifier: string) => {
    //case 3 different subthemes

    if (subthemeCount === 3) {
      if (identifier === "4") {
        if (
          title1 === null ||
          title2 === null ||
          content1 === null ||
          content2 === null
        ) {
          return true;
        } else {
          return false;
        }
      } else if (identifier === "5") {
        if (
          title2 === null ||
          title3 === null ||
          content2 === null ||
          content3 === null
        ) {
          return true;
        } else {
          return false;
        }
      } else if (identifier === "6") {
        if (
          title3 === null ||
          title1 === null ||
          content3 === null ||
          content1 === null
        ) {
          return true;
        } else {
          return false;
        }
      } else if (identifier === "7") {
        if (
          title4 === null ||
          title5 === null ||
          content4 === null ||
          content5 === null
        ) {
          return true;
        } else {
          return false;
        }
      } else if (identifier === "8") {
        if (
          title5 === null ||
          title6 === null ||
          content5 === null ||
          content6 === null
        ) {
          return true;
        } else {
          return false;
        }
      } else if (identifier === "9") {
        if (
          title7 === null ||
          title8 === null ||
          content7 === null ||
          content8 === null
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else if (subthemeCount === 2) {
      if (identifier === "4") {
        if (
          title1 === null ||
          title2 === null ||
          content1 === null ||
          content2 === null
        ) {
          return true;
        } else {
          return false;
        }
      } else if (identifier === "5") {
        if (title2 === null || content2 === null) {
          return true;
        } else {
          return false;
        }
      } else if (identifier === "7") {
        if (
          title4 === null ||
          title5 === null ||
          content4 === null ||
          content5 === null
        ) {
          return true;
        } else {
          return false;
        }
      } else if (identifier === "8") {
        if (title5 === null || content5 === null) {
          return true;
        } else {
          return false;
        }
      } else if (identifier === "9") {
        if (
          title7 === null ||
          title8 === null ||
          content7 === null ||
          content8 === null
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else if (subthemeCount === 1) {
      if (identifier === "4") {
        if (title1 === null || content1 === null) {
          return true;
        } else {
          return false;
        }
      } else if (identifier === "7") {
        if (title4 === null || content4 === null) {
          return true;
        } else {
          return false;
        }
      } else if (identifier === "9") {
        if (title7 === null || content7 === null) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  {
    /* content combo */
  }
  const getContentAndTitleComboForAdd = (identifier: string) => {
    if (subthemeCount === 3) {
      if (identifier === "4") {
        const title = title1 + " " + title2;
        const content = content1 + " " + content2;

        return { title, content };
      } else if (identifier === "5") {
        const title = title2 + " " + title3;
        const content = content2 + " " + content3;
        return { title, content };
      } else if (identifier === "6") {
        const title = title3 + " " + title1;
        const content = content3 + " " + content1;

        return { title, content };
      } else if (identifier === "7") {
        const title = title4 + " " + title5;
        const content = content4 + " " + content5;

        return { title, content };
      } else if (identifier === "8") {
        const title = title5 + " " + title6;
        const content = content5 + " " + content6;

        return { title, content };
      } else if (identifier === "9") {
        const title = title7 + " " + title8;
        const content = content7 + " " + content8;

        return { title, content };
      }
    } else if (subthemeCount === 2) {
      if (identifier === "4") {
        const title = title1 + " " + title2;
        const content = content1 + " " + content2;

        return { title, content };
      } else if (identifier === "5") {
        const title = title2;
        const content = content2;
        return { title, content };
      } else if (identifier === "7") {
        const title = title4 + " " + title5;
        const content = content4 + " " + content5;

        return { title, content };
      } else if (identifier === "8") {
        const title = title5;
        const content = content5;

        return { title, content };
      } else if (identifier === "9") {
        const title = title7 + " " + title8;
        const content = content7 + " " + content8;

        return { title, content };
      }
    } else if (subthemeCount === 1) {
      if (identifier === "4") {
        const title = title1;
        const content = content1;
        return { title, content };
      } else if (identifier === "7") {
        const title = title4;
        const content = content4;
        return { title, content };
      } else if (identifier === "9") {
        const title = title7;
        const content = content7;
        return { title, content };
      }
    }
  };

  // to use getContentAndTitleComboForAdd in addData
  // addData = (item: string) => {
  //   console.log(' -- addData -- ' + item);
  //   const {title, content} = getContentAndTitleComboForAdd(item);
  //   console.log(title);
  //   console.log(content);

  if (subthemeCount === 3) {
    let addButtonDisable4 = getAddButtonDisable("4");
    let addButtonDisable5 = getAddButtonDisable("5");
    let addButtonDisable6 = getAddButtonDisable("6");
    let addButtonDisable7 = getAddButtonDisable("7");
    let addButtonDisable8 = getAddButtonDisable("8");
    let addButtonDisable9 = getAddButtonDisable("9");
    let { titleAdd4, contentAdd4 } = getContentAndTitleComboForAdd("4");
    let { titleAdd5, contentAdd5 } = getContentAndTitleComboForAdd("5");
    let { titleAdd6, contentAdd6 } = getContentAndTitleComboForAdd("6");
    let { titleAdd7, contentAdd7 } = getContentAndTitleComboForAdd("7");
    let { titleAdd8, contentAdd8 } = getContentAndTitleComboForAdd("8");
    let { titleAdd9, contentAdd9 } = getContentAndTitleComboForAdd("9");
    return (
      <div className="panel-body">
        <div className="row mb20" data-animate="400">
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key1}
                title="Error"
                content={error}
                podIndicator="POD 1"
              />
            ) : content1Empty ? (
              <PanelNotCompleted
                key={key1}
                title={title1}
                content={content1}
                identifier="1"
                podIndicator="POD 1"
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key1}
                item_id={key1}
                identifier="1"
                title={title1}
                content={content1}
                podIndicator="POD 1"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key2}
                title="Error"
                content={error}
                podIndicator="POD 2"
              />
            ) : Content2Empty ? (
              <PanelNotCompleted
                key={key2}
                title={title2}
                content={content2}
                identifier="2"
                podIndicator="POD 2"
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key2}
                item_id={key2}
                title={title2}
                identifier="2"
                content={content2}
                podIndicator="POD 2"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key3}
                title="Error"
                content={error}
                podIndicator="POD 3"
              />
            ) : Content3Empty ? (
              <PanelNotCompleted
                key={key3}
                title={title3}
                content={content3}
                identifier="3"
                podIndicator="POD 3"
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key3}
                item_id={key3}
                title={title3}
                identifier="3"
                content={content3}
                podIndicator="POD 3"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
        </div>
        <div className="row mb20" data-animate="400">
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key4}
                title="Error"
                content={error}
                podIndicator="POD 4"
              />
            ) : Content4Empty ? (
              <PanelNotCompleted
                key={key4}
                title={titleAdd4}
                content={contentAdd4}
                identifier="4"
                podIndicator={"POD 4"}
                addButtonDisabled={addButtonDisable4}
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key4}
                item_id={key4}
                identifier="4"
                title={title4}
                content={content4}
                podIndicator="POD 4"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key5}
                title="Error"
                content={error}
                podIndicator="POD 5"
              />
            ) : Content5Empty ? (
              <PanelNotCompleted
                key={key5}
                title={titleAdd5}
                content={contentAdd5}
                identifier="5"
                podIndicator={"POD 5"}
                addButtonDisabled={addButtonDisable5}
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key5}
                item_id={key5}
                identifier="5"
                title={title5}
                content={content5}
                podIndicator="POD 5"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key6}
                title="Error"
                content={error}
                podIndicator="POD 6"
              />
            ) : Content6Empty ? (
              <PanelNotCompleted
                key={key6}
                title={titleAdd6}
                content={contentAdd6}
                identifier="6"
                podIndicator={"POD 6"}
                addButtonDisabled={addButtonDisable6}
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key6}
                item_id={key6}
                identifier="6"
                title={title6}
                content={content6}
                podIndicator="POD 6"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
        </div>

        <div className="row mb20" data-animate="300">
          <div className="col-md-2"></div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key7}
                title="Error"
                content={error}
                podIndicator="POD 7"
              />
            ) : Content7Empty ? (
              <PanelNotCompleted
                key={key7}
                title={titleAdd7}
                content={contentAdd7}
                identifier="7"
                podIndicator={"POD 7"}
                addButtonDisabled={addButtonDisable7}
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key7}
                item_id={key7}
                identifier="7"
                title={title7}
                content={content7}
                podIndicator="POD 7"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key8}
                title="Error"
                content={error}
                podIndicator="POD 8"
              />
            ) : Content8Empty ? (
              <PanelNotCompleted
                key={key8}
                title={titleAdd8}
                content={contentAdd8}
                identifier="8"
                podIndicator={"POD 8"}
                addButtonDisabled={addButtonDisable8}
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key8}
                item_id={key8}
                identifier="8"
                title={title8}
                content={content8}
                podIndicator="POD 8"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row mb20" data-animate="200">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key9}
                title="Error"
                content={error}
                podIndicator="POD 9"
              />
            ) : Content9Empty ? (
              <PanelNotCompleted
                key={key9}
                title={titleAdd9}
                content={contentAdd9}
                identifier="9"
                podIndicator={"POD 9"}
                addButtonDisabled={addButtonDisable9}
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key9}
                item_id={key9}
                identifier="9"
                title={title9}
                content={content9}
                podIndicator="POD 9"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  } else if (subthemeCount === 2) {

    let addButtonDisable4 = getAddButtonDisable("4");
    let addButtonDisable7 = getAddButtonDisable("7");
    let addButtonDisable9 = getAddButtonDisable("9");
    let { titleAdd4, contentAdd4 } = getContentAndTitleComboForAdd("4");
    let { titleAdd7, contentAdd7 } = getContentAndTitleComboForAdd("7");
    let { titleAdd9, contentAdd9 } = getContentAndTitleComboForAdd("9");

    return (
      <div className="panel-body">
        <div className="row mb20" data-animate="400">
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key1}
                title="Error"
                content={error}
                podIndicator="POD 1"
              />
            ) : content1Empty ? (
              <PanelNotCompleted
                key={key1}
                title={title1}
                content={content1}
                identifier="1"
                podIndicator="POD 1"
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key1}
                item_id={key1}
                identifier="1"
                title={title1}
                content={content1}
                podIndicator="POD 1"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key2}
                title="Error"
                content={error}
                podIndicator="POD 2"
              />
            ) : Content2Empty ? (
              <PanelNotCompleted
                key={key2}
                title={title2}
                content={content2}
                identifier="2"
                podIndicator="POD 2"
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key2}
                item_id={key2}
                identifier="2"
                title={title2}
                content={content2}
                podIndicator="POD 2"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key3}
                title="Error"
                content={error}
                podIndicator="POD 3"
              />
            ) : (
              <PanelAllDark />
            )}
          </div>
        </div>
        <div className="row mb20" data-animate="400">
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key4}
                title="Error"
                content={error}
                podIndicator="POD 4"
              />
            ) : Content4Empty ? (
              <PanelNotCompleted
                key={key4}
                title={titleAdd4}
                content={contentAdd4}
                identifier="4"
                podIndicator={"POD 4"}
                addButtonDisabled={addButtonDisable4}
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key4}
                item_id={key4}
                identifier="4"
                title={title4}
                content={content4}
                podIndicator="POD 4"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key5}
                title="Error"
                content={error}
                podIndicator="POD 5"
              />
            ) : (
              <PanelAllDark />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key6}
                title="Error"
                content={error}
                podIndicator="POD 6"
              />
            ) : (
              <PanelAllDark />
            )}
          </div>
        </div>

        <div className="row mb20" data-animate="300">
          <div className="col-md-2"></div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key7}
                title="Error"
                content={error}
                podIndicator="POD 7"
              />
            ) : Content7Empty ? (
              <PanelNotCompleted
                key={key7}
                title={titleAdd7}
                content={contentAdd7}
                identifier="7"
                podIndicator={"POD 7"}
                addButtonDisabled={addButtonDisable7}
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key7}
                item_id={key7}
                identifier="7"
                title={title7}
                content={content7}
                podIndicator="POD 7"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key8}
                title="Error"
                content={error}
                podIndicator="POD 8"
              />
            ) : (
              <PanelAllDark />
            )}
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row mb20" data-animate="200">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key9}
                title="Error"
                content={error}
                podIndicator="POD 9"
              />
            ) : Content9Empty ? (
              <PanelNotCompleted
                key={key9}
                title={titleAdd9}
                content={contentAdd9}
                identifier="9"
                podIndicator={"POD 9"}
                addButtonDisabled={addButtonDisable9}
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key9}
                item_id={key9}
                identifier="9"
                title={title9}
                content={content9}
                podIndicator="POD 9"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  } else if (subthemeCount === 1) {

    let addButtonDisable4 = getAddButtonDisable("4");
    let addButtonDisable7 = getAddButtonDisable("7");
    let addButtonDisable9 = getAddButtonDisable("9");
    let { titleAdd4, contentAdd4 } = getContentAndTitleComboForAdd("4");
    let { titleAdd7, contentAdd7 } = getContentAndTitleComboForAdd("7");
    let { titleAdd9, contentAdd9 } = getContentAndTitleComboForAdd("9");
    return (
      <div className="panel-body">
        <div className="row mb20" data-animate="400">
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key1}
                title="Error"
                content={error}
                podIndicator="POD 1"
              />
            ) : content1Empty ? (
              <PanelNotCompleted
                key={key1}
                title={title1}
                content={content1}
                identifier="1"
                podIndicator="POD 1"
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key1}
                item_id={key1}
                title={title1}
                identifier="1"
                content={content1}
                podIndicator="POD 1"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key2}
                title="Error"
                content={error}
                podIndicator="POD 2"
              />
            ) : (
              <PanelAllDark />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key3}
                title="Error"
                content={error}
                podIndicator="POD 3"
              />
            ) : (
              <PanelAllDark />
            )}
          </div>
        </div>
        <div className="row mb20" data-animate="400">
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key4}
                title="Error"
                content={error}
                podIndicator="POD 4"
              />
            ) : Content4Empty ? (
              <PanelNotCompleted
                key={key4}
                title={titleAdd4}
                content={contentAdd4}
                identifier="4"
                podIndicator={"POD 4"}
                addButtonDisabled={addButtonDisable4}
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key4}
                item_id={key4}
                identifier="4"
                title={title4}
                content={content4}
                podIndicator="POD 4"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key5}
                title="Error"
                content={error}
                podIndicator="POD 5"
              />
            ) : (
              <PanelAllDark />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key6}
                title="Error"
                content={error}
                podIndicator="POD 6"
              />
            ) : (
              <PanelAllDark />
            )}
          </div>
        </div>

        <div className="row mb20" data-animate="300">
          <div className="col-md-2"></div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key7}
                title="Error"
                content={error}
                podIndicator="POD 7"
              />
            ) : Content7Empty ? (
              <PanelNotCompleted
                key={key7}
                title={titleAdd7}
                content={contentAdd7}
                identifier="7"
                podIndicator={"POD 7"}
                addButtonDisabled={addButtonDisable7}
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key7}
                item_id={key7}
                identifier="7"
                title={title7}
                content={content7}
                podIndicator="POD 7"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key8}
                title="Error"
                content={error}
                podIndicator="POD 8"
              />
            ) : (
              <PanelAllDark />
            )}
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row mb20" data-animate="200">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            {loading ? (
              <PanelLoading />
            ) : error ? (
              <PanelError
                key={key9}
                title="Error"
                content={error}
                podIndicator="POD 9"
              />
            ) : Content9Empty ? (
              <PanelNotCompleted
                key={key9}
                title={titleAdd9}
                content={contentAdd9}
                identifier="9"
                podIndicator={"POD 9"}
                addButtonDisabled={addButtonDisable9}
                addData={addData}
              />
            ) : (
              <PanelActive
                key={key9}
                item_id={key9}
                identifier="9"
                title={title9}
                content={content9}
                podIndicator="POD 9"
                deleteDataClick={deleteDataClick}
                editDataClick={editDataClick}
                addData={addData}
              />
            )}
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="panel-body">
        <div className="row mb20" data-animate="400">
          <div className="col-md-4">
            <PanelLoading />
          </div>
          <div className="col-md-4">
            <PanelLoading />
          </div>
          <div className="col-md-4">
            <PanelLoading />
          </div>
        </div>
        <div className="row mb20" data-animate="400">
          <div className="col-md-4">
            <PanelLoading />
          </div>
          <div className="col-md-4">
            <PanelLoading />
          </div>
          <div className="col-md-4">
            <PanelLoading />
          </div>
        </div>

        <div className="row mb20" data-animate="300">
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <PanelLoading />
          </div>
          <div className="col-md-4">
            <PanelLoading />
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row mb20" data-animate="200">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <PanelLoading />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
};

export default PanelBody;
/*```
import React, { useEffect, useState } from 'react';
import PanelActive from "../Panel/PanelPod/PanelActive";
import PanelLoading from "./PanelPod/PanelLoading";
import PanelAllDark from "./PanelPod/PanelAllDark";
import PanelNotCompleted from "./PanelPod/PanelNotCompleted";
import PanelError from "./PanelPod/PanelError";
import { dataExtractor } from './helpers'; // Assuming dataExtractor is in helpers.js

// ... other imports and types

const PanelBody = ({ data, subthemeCount, loading, deleteDataClick, editDataClick, addData, saveData, error }) => {
  // State Hooks for each panel item
  const [panelItems, setPanelItems] = useState([]);

  useEffect(() => {
    // Initialize state and local storage
    const extractedData = dataExtractor(data);
    setPanelItems(extractedData);
    localStorage.setItem('panelData', JSON.stringify(extractedData));
  }, [data]);

  // Edit content
  const handleEdit = (index, newTitle, newContent) => {
    // Update state and local storage
    const updatedItems = [...panelItems];
    updatedItems[index] = { ...updatedItems[index], title: newTitle, content: newContent };
    setPanelItems(updatedItems);
    localStorage.setItem('panelData', JSON.stringify(updatedItems));

    // Update the database (AJAX request)
    saveData(updatedItems[index].key, index, newContent);
  };

  // Reset content to original
  const handleReset = (index) => {
    const originalData = JSON.parse(localStorage.getItem('panelData'));
    const updatedItems = [...panelItems];
    updatedItems[index] = originalData[index];
    setPanelItems(updatedItems);
  };

  // Delete content
  const handleDelete = (index, itemId) => {
    // Update state and local storage
    const updatedItems = panelItems.filter((_, i) => i !== index);
    setPanelItems(updatedItems);
    localStorage.setItem('panelData', JSON.stringify(updatedItems));

    // Delete from the database (AJAX request)
    deleteDataClick(itemId, index);
  };

  // Render panels based on state
  const renderPanels = () => {
    return panelItems.map((item, index) => (
      // Your panel rendering logic here
      // Use item.title, item.content, item.key as needed
      // Add handleEdit, handleReset, handleDelete as props to panel components
    ));
  };

  return (
    <div className="panel-body">
      {loading ? <PanelLoading /> : error ? <PanelError content={error} /> : renderPanels()}
    </div>
  );
};

export default PanelBody;

```*/
