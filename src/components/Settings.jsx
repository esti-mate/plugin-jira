import  ForgeUI,{  Text, Fragment , Select, Button, Form , Heading,useState , SectionMessage    } from '@forge/ui';
import {invokeApi} from "../utils/invokeEndpoint"
import api , { route} from "@forge/api"


export const App = () => {
  const [filters,setFilters] =useState(getFilters)

  // useEffect(()=>{
  //   getFilters().then((res)=>{
  //     console.log({res});
  //     setFilters(res)
  //   })
  
  // },[])

  console.log({filters});
  return (
    <Fragment>
      <Heading size="medium">Tech how to estimate</Heading>
      <Text>Select historic data of your project</Text>
      <Form
        onSubmit={(props) => {
          const filter = filters.filter((filter)=>filter.id === props.filter)[0];
          console.log("form props:",props);
          console.log("filter jql:", filter.jql);

          return handleTrainJob(filter.jql, "org_02")
        }}
      >
        <Select name="filter" label="Select a Filter">
            {
              filters.map((filter)=>(
                <Option value={filter.id} label={filter.name}/>
              ))
            }
        </Select>
        <SectionMessage appearance="warning">
          <Text>
            Esti-mate is learning your estimation patters
          </Text>
        </SectionMessage>
      </Form>
    </Fragment>
  );
};

/**
 * 
 * @param {string} jql 
 * @param {string} org_id 
 * @returns {Promise<{jobid:string}>
 */
const handleTrainJob =async (jql,org_id, )=>{
  try {
    const res = await export_dataset(jql)
    let gs_path = res.gs_path;  
    const gs_path_list =  gs_path.split("/");
    gs_path = gs_path_list[gs_path_list.length-2] + "/" + gs_path_list[gs_path_list.length-1];

    const jobRes = await startAJob({train_ds_path:gs_path,org_id:org_id});

    console.log("jobRes : ",jobRes);


    return jobRes;
    
  } catch (error) {
    throw error;
  }
}


/**
 * 
 * @param { { train_ds_path: string; org_id: string; } } props 
 * @returns 
 */
const startAJob = async (props) => {
  console.log("Calling start a job on ds_path : ",props.train_ds_path);
  
  const body = {
    display_name: `${props.org_id}-job`,
    machine_type: config.TRAIN_MACHINE_TYPE,
    train_ds_path: props.train_ds_path ,
    org_id: props.org_id,
    sequence_length: config.TRAIN_SEQUENCE_LENGTH,
    batch_size_ratio:config.TRAIN_BATCH_SIZE_RATIO,
    epoch: config.TRAIN_EPOCH
  };

  return await invokeApi("start-train-job", "POST", body);
};

/**
 * 
 * @param {string} jql 
 * @returns {Promise<{gs_path:string}>}
 */
const export_dataset = async (jql) => {
  console.log("Calling export dataset : ",jql);
  
  const body = {
    jql
  };

  return await invokeApi("export-csv", "POST", body);
};

const getFilters = async () => {
  console.log("fetching issue");
  const issueResponse = await api
    .asUser()
    .requestJira(route`/rest/api/2/filter/my`);
  
  const res = await issueResponse.json();
  
  console.log("filter count : ",res.length);
  return  []
}

