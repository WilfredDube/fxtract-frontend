import { Avatar, Container, Typography } from "@material-ui/core";
import { AccountCircleOutlined } from "@material-ui/icons";
import React, { useContext, useEffect } from "react";
// import { UserContext } from "../../App";
import { AuthContext } from "../../contexts/AuthContext";
import { CADViewerContext } from "../../contexts/CADViewerContext";
import { ProjectContext } from "../../contexts/ProjectContext";

const Profile = ({ location }) => {
  const { user, setCurrLocation } = useContext(AuthContext);
  const { count } = useContext(ProjectContext);
  const { cadFilesCount } = useContext(CADViewerContext);

  useEffect(() => {
    setCurrLocation(location.pathname);
  }, [location, setCurrLocation]);

  //   const [mypics, setPics] = useState([]);
  //   const { state, dispatch } = useContext(UserContext);
  //   const [image, setImage] = useState("");
  //   useEffect(() => {
  //     fetch("/mypost", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("jwt"),
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);
  //         setPics(result.mypost);
  //       });
  //   }, []);
  //   useEffect(() => {
  //     if (image) {
  //       const data = new FormData();
  //       data.append("file", image);
  //       data.append("upload_preset", "insta-clone");
  //       data.append("cloud_name", "cnq");
  //       fetch("https://api.cloudinary.com/v1_1/cnq/image/upload", {
  //         method: "post",
  //         body: data,
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           fetch("/updatepic", {
  //             method: "put",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: "Bearer " + localStorage.getItem("jwt"),
  //             },
  //             body: JSON.stringify({
  //               pic: data.url,
  //             }),
  //           })
  //             .then((res) => res.json())
  //             .then((result) => {
  //               console.log(result);
  //               localStorage.setItem(
  //                 "user",
  //                 JSON.stringify({ ...state, pic: result.pic })
  //               );
  //               dispatch({ type: "UPDATEPIC", payload: result.pic });
  //               //window.location.reload()
  //             });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }, [image]);

  //   const updatePhoto = (file) => {
  //     setImage(file);
  //   };
  return (
    <div style={{ padding: 50, background: "#F2F4F8" }}>
      <Container>
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div
            style={{
              margin: "18px 0px",
              borderBottom: "1px solid grey",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>
                <Avatar style={{ width: 200, height: 200 }}>
                  <AccountCircleOutlined />
                </Avatar>
              </div>
              <div>
                <Typography variant="h4">
                  {user.firstname + " " + user.lastname}
                </Typography>
                <Typography variant="h6">{user.email}</Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "108%",
                  }}
                >
                  <h6>{count} projects</h6>
                  <h6>{cadFilesCount} CAD files</h6>
                  <h6>{"0"} processes</h6>
                </div>
              </div>
            </div>

            <div className="file-field input-field" style={{ margin: "10px" }}>
              <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input
                  type="file"
                  //   onChange={(e) => updatePhoto(e.target.files[0])}
                />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </div>
          <div className="gallery">
            {/* {mypics.map((item) => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.photo}
              alt={item.title}
            />
          );
        })} */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
