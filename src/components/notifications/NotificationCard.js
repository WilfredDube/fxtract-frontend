import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  CardHeader,
  makeStyles,
  Divider,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@material-ui/core";
import { CheckRounded, CloseRounded } from "@material-ui/icons";
import { green, red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { convertTimestamp } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  green: {
    color: "#fff",
    backgroundColor: green[600],
  },
  red: {
    color: "#fff",
    backgroundColor: red[600],
  },
  statusOK: {
    color: "#fff",
    backgroundColor: green[600],
  },
  statusFail: {
    color: "#fff",
    backgroundColor: red[600],
  },
}));

let overallStatus = 0;
// function createData(Filename, ProcessType, Status) {
//   overallStatus += Status;
//   return { Filename, ProcessType, Status };
// }

export default function NotificationCard({ task }) {
  const classes = useStyles();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
        },
        margin: 30,
      }}
    >
      <Accordion variant="outlined" sx={{ maxWidth: 345 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <CardHeader
            title={task.desc}
            subheader={convertTimestamp(task.created_at)}
            avatar={
              <Avatar
                className={
                  overallStatus % 2 === 0 ? classes.green : classes.red
                }
                sx={{ bgcolor: green[500] }}
              >
                {overallStatus % 2 === 0 ? (
                  <CheckRounded className={classes.statusOK} />
                ) : (
                  <CloseRounded className={classes.statusFail} />
                )}
              </Avatar>
            }
          />
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>File name</TableCell>
                  <TableCell>Process type</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {task.processed_cadfiles.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.filename}
                    </TableCell>
                    <TableCell>{row.process_type}</TableCell>
                    <TableCell align="right">
                      {row.status === "Complete" ? (
                        <CheckRounded className={classes.statusOK} />
                      ) : (
                        <CloseRounded className={classes.statusFail} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
