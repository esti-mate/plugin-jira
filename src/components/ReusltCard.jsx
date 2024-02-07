import ForgeUI, {Text, Tag, Fragment} from "@forge/ui"

export const ResultCard = (props) => {
    if (!props.prediction) return <Fragment><Text>No predictions have made</Text></Fragment>;
    return (
      <Fragment>
        <Text>Predicted estimation (Story points) : 

        <Tag color="blue-light" text={Math.round(Number(props.prediction)).toFixed(2)}></Tag>
        </Text>
      </Fragment>
    );
  };


