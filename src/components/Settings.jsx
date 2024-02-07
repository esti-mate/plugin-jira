import  ForgeUI,{  Text, Fragment , Select, Button, Form , Heading   } from '@forge/ui';

export const App = () => {
  return (
    <Fragment>
      <Heading size='medium' >Tech how to estimate</Heading>
      <Text>Select historic data of your project</Text>
      <Form  onSubmit={(props)=>{
        console.log(props)
        return startAJob(props).then((res)=>{
          console.log({res});



         }) 
        
        
        }} >
      <Select name="filter"  label='Select a Filter' ></Select>

      </Form>

    </Fragment>
  );
};

const startAJob = async (props) => {
  console.log("Calling ")
  var myHeaders = new Headers();
myHeaders.append("Accept", "*/*");
myHeaders.append("User-Agent", "Thunder Client (https://www.thunderclient.com)");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "project_id": "esti-mate-411304",
  "location": "us-central1",
  "display_name": "GTP2SP train -2.6",
  "container_image_uri": "gcr.io/esti-mate-411304/your-tpu-image",
  "machine_type": "n1-standard-8",
  "tpu_type": "v2-8",
  "tpu_cores": 8
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

 return fetch("http://localhost:8081/start-training", requestOptions)
}