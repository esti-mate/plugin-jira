import ForgeUI, {
  Button,
  Fragment,
  Tag,
  Text,
  useEffect,
  useProductContext,
  useState,
} from "@forge/react";

import api, { route } from "@forge/api";
import { ResultCard } from "./ReusltCard";

/**
 * 
 * @type { (issueKey:string)=>Promise<{id:string,fields:{summary:string}}> }
 */
const fetchIssue = async (issueKey) => {
  console.log("fetching issue");
  const issueResponse = await api
    .asApp()
    .requestJira(route`/rest/api/3/issue/${issueKey}`);

  return issueResponse.json();
};

function Field() {
  const { platformContext:{issueKey} } = useProductContext()
  const [estimatedVale, setEstimatedValue] = useState();

  /**
   *
   * @type { (text:string)=>Promise<{organizationId:string,prediction:number}> }
   */
  const get_prediction = async () => {
    const issue =  await fetchIssue(issueKey)
    
    console.log("getting prediction for : ",issue.fields.summary );

    const  raw = JSON.stringify({
      organizationId: "org01",
      text: issue.fields.summary,
    });
    const res = await api.fetch("https://esti-mate.xyz/get-predictions", {
      body: raw,
      method: "POST",
    });
    const data = await res.json();
    return data;
  };


  return (
    <Fragment >
      <ResultCard prediction={estimatedVale}  />

      <Button
        appearance="default" 
        icon="premium"
        onClick={async () => {
          const res = await get_prediction();
          setEstimatedValue(res.prediction);
        }}
        text="Estimate!"
      ></Button>
    </Fragment>
  );
}

export default Field;
