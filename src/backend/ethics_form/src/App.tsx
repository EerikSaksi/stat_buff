import React, { useEffect } from "react";
import "fontsource-roboto";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, Checkbox, Grid, Input, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

const CREATE_SIGNED_ETHICS_SHEET = gql`
  mutation($username: String!) {
    createSignedEthicsSheet(input: { signedEthicsSheet: { username: $username } }) {
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
    padding: theme.spacing(2)
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
      "This research aims to examine the effectiveness of collaborative activity trackers. Collaborative activity trackers are apps that let users monitor their exercise, whilst contributing towards some common goal. My activity tracker app implements collaboration through a fantasy game, where you will be fighting enemy monsters together with your friends through exercise. You will be invited to conduct a survey/interview after 2-3 weeks of using this app, unless you've withdrawn.",
    buttonText: "I understand the procedure and wish to be a part of it",
  },
  {
    prompt: "Procedures, risks, and benefits to the participants",
    answer:
      "By using this app you will track workouts and exercise performance. This app can be motivating to exercise, and motivate you to make change to your exercise habits. You should remember that exercise has inherent risks, and to mitigate this, you should conduct research from credible sources and/or consult a medical professional before making changes to your exercise habits.",
    buttonText: "I understand and will mitigate any risks",
  },
  {
    prompt: "Information about confidentiality and handling of data (including any sharing with third parties)",
    answer:
    "You can request the deletion of your data and withdraw from the study at any time, and ask any questions by emailing saksi.eerik@gmail.com. Your data is NOT shared with any third parties. A user needs to be authenticated to make changes to their data. Your data is stored until all interviews/surveys have been completed (mid to late march).",
    buttonText: "I consent to how my data is used, and that I can withdraw my consent at any time",
    answerBulletPoints: (
      <ul style = { { fontSize: 20} }>
        <li>Data visibility policies</li>
        <ul>
          <li>Data visible to me and your group</li>
          <ul>
            <li>Your chat messages</li>
            <li>Your workouts</li>
            <li>Your exercise personal records</li>
            <li>Your username</li>
          </ul>
          <li>Data visible only to me</li>
          <ul>
            <li>Analytics data</li>
            <ul>
              <li>What screens you are viewing and when (user screen, group screen, chats, etc.) and for how long?</li>
              <li>How often you open the app and when?</li>
            </ul>
            <li>Any survey/interview responses</li>
          </ul>
          <li>Data visible to no one</li>
          <ul>
            <li>Passwords (these are hashed and salted, and aren't reversible) and aren't stored in the app</li>
          </ul>
        </ul>
      </ul>
    ),
  },
  {
    prompt: "Age policy",
    answer: "You must be over the age of 18 in order to participate",
    buttonText: "I am over 18",
  },
];
function App() {
  const [username, setUsername] = useState("");
  const params = useParams<{ username: string }>();
  const [checkboxState, setCheckboxState] = useState(new Array(ethicsGuidelines.length).fill(true));
  const classes = useStyles();
  const [createSignedEthicsSheet] = useMutation(CREATE_SIGNED_ETHICS_SHEET, {
    variables: { username },
    onCompleted: () => {
      window.location.replace("exp://192.168.8.107:19000");
    },
  });
  useEffect(() => {
    if (params && params.username) {
      setUsername(params.username);
    }
  }, [params]);
  const agreed = checkboxState.every((check) => check);
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justify="center" alignItems="center">
        <Card style={{ padding: 20 }} className={classes.card}>
          <Typography className = {classes.text}>The username that you wish to use with Stat Buff</Typography>
          <Grid container justify="center" alignItems="center">
            <Input value={username} onChange={({ target }) => setUsername(target.value)} placeholder="Username" />
          </Grid>
        </Card>
      </Grid>

      {ethicsGuidelines.map((guideline, index) => (
        <Grid key={index} className={classes.grid} container justify="center" alignItems="center">
          <Card className={classes.card}>
              <Typography className = {classes.text} variant="h4">
                {guideline.prompt}
              </Typography>
            <Grid container justify="flex-start" alignItems="center">
              <Typography  variant="h5">
                {guideline.answer}
              </Typography>
            </Grid>

            {guideline.answerBulletPoints}
            <Grid className={classes.checkboxGrid} container justify="center" alignItems="center">
              <Grid className={classes.checkboxGrid} container justify="center" alignItems="center" direction="row" >
                <Typography className={classes.text} variant="h5">
                  {guideline.buttonText}
                </Typography>
              </Grid>
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
            </Grid>
          </Card>
        </Grid>
      ))}
      <Grid style={{ paddingBottom: 50 }} className={classes.grid} container justify="center" alignItems="center">
        <Card >
          <Button onClick={() => createSignedEthicsSheet()} disabled={!agreed || !username.length} color="primary" variant="contained">
            Submit ethics consent form
          </Button>
        </Card>
      </Grid>
    </div>
  );
}

export default App;
