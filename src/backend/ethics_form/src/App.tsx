import React, {useEffect}  from "react";
import "fontsource-roboto";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, Checkbox, Grid, Input, Typography } from "@material-ui/core";
import {useParams} from "react-router-dom";

const CREATE_SIGNED_ETHICS_SHEET = gql`
  mutation ($username: String!){
    createSignedEthicsSheet(input: { signedEthicsSheet: { username: $username} }) {
      signedEthicsSheet {
        username
      }
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(180,21,227,1) 25%, rgba(134,69,234,1) 54%, rgba(0,212,255,1) 100%)",
    zIndex: -1,
    display: "flex",
    flexDirection: "column",
    minHeight: window.innerHeight,
    flexWrap: "wrap",
  },
  text: {
    textAlign: "center",
  },
  card: {
    boxShadow: theme.shadows[24],
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  grid: {
    padding: 50,
    paddingBottom: 0,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  checkboxGrid: {
    padding: theme.spacing(2),
  },
}));

const ethicsGuidelines = [
  {
    prompt: "The nature, purpose and duration of the research",
    answer:
      "This research aims to examine the effectiveness of collaborative activity trackers. Collaborative activity trackers are apps that let users monitor their exercise, whilst contributing towards some common goal. My activity tracker app implements collaboration through a fantasy game, which you will using in order to test the effectiveness of collaborative activity trackers, and my implementation of it. You will be invited to conduct a survey/interview after 2-3 weeks of using this app, unless you've withdrawn.",
    buttonText: "I understand the procedure and wish to be a part of it",
  },
  {
    prompt: "Procedures, risks, and benefits to the participants",
    answer:
      "By using this app you will track workouts and exercise performance. This app can be motivating to exercise, and motivate you to make change to your exercise habits. You should remember that exercise has inherent risks, and to mitigate this, you should conduct research from credible sources and/or consult a medical professional before making changes to my exercise habits.",
    buttonText: "I understand and will mitigate any risks",
  },
  {
    prompt: "Information about confidentiality and handling of data (including any sharing with third parties)",
    answer:
      "Your app usage data and survey/interview answers will be used as a part of the study. You can request the deletion of your data and withdraw at any time, and ask any questions by emailing saksi.eerik@gmail.com. Your data is NOT shared with any third parties.",
    buttonText: "I consent with my data being used and understand the withdrawal process",
  },
  {
    prompt: "Age policy",
    answer: "You must be over the age of 18 in order to participate",
    buttonText: "I am over 18",
  },
];
function App() {
  const [username, setUsername] = useState("asdfasdf");
  const params = useParams<{username: string}>()
  const [checkboxState, setCheckboxState] = useState(new Array(ethicsGuidelines.length).fill(true));
  const classes = useStyles();
  const [createSignedEthicsSheet,] = useMutation(CREATE_SIGNED_ETHICS_SHEET, {
    variables: { username },
    onCompleted: () => {
      window.location.replace("exp://192.168.8.107:19000");
    }
  });
  useEffect(() => {
    if (params && params.username){
      setUsername(params.username)
    }
  }, [params])
  const agreed = checkboxState.every((check) => check);
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justify="center" alignItems="center">
        <Card style={{ padding: 20 }} className={classes.card}>
          <Typography>The username that you wish to use with Stat Buff</Typography>
          <Grid container justify="center" alignItems="center">
            <Input value={username} onChange={({ target }) => setUsername(target.value)} placeholder="Username" />
          </Grid>
        </Card>
      </Grid>

      {ethicsGuidelines.map((guideline, index) => (
        <Grid key = {index} className={classes.grid} container justify="center" alignItems="center">
          <Card className={classes.card}>
            <Grid container justify="center" alignItems="center">
              <Typography className={classes.text} variant="h4">
                {guideline.prompt}
              </Typography>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Typography className={classes.text} variant="h5">
                {guideline.answer}
              </Typography>
            </Grid>
            <Grid className={classes.checkboxGrid} container justify="center" alignItems="center">
              <Checkbox
                value={checkboxState[index]}
                onChange={({ target }) =>
                  setCheckboxState((oldState) => {
                    var copy = [...oldState];
                    copy[index] = target.checked;
                    return copy;
                  })
                }
              />
              <Typography className={classes.text} variant="h5">
                {guideline.buttonText}
              </Typography>
            </Grid>
          </Card>
        </Grid>
      ))}
      <Grid style={{ paddingBottom: 50 }} className={classes.grid} container justify="center" alignItems="center">
        <Card className={classes.card}>
          <Button onClick= {() => createSignedEthicsSheet()} disabled={!agreed || !username.length} color="primary" variant="contained">
            Submit ethics consent form
          </Button>
        </Card>
      </Grid>
    </div>
  );
}

export default App;
