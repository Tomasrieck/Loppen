import React, { Component } from "react";
import Firestore from "@firebase/firestore";

class FirebaseApp extends Component {
  state = {
    user: {
      userName: doc.data().userName,
    },
  };
  constructor(props) {
    super(props);
    this.getUser();
    this.subscriber = Firestore()
      .collection("User")
      .doc("FDmjVl8ZcK6GkFkHyYA0")
      .onSnapshot((doc) => {
        this.setState({
          user: {
            userName: doc.data().userName,
          },
        });
      });
    Firestore()
      .collection("User")
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          console.log(
            "User ID: ",
            documentSnapshot.id,
            documentSnapshot.date()
          );
        });
      });
  }

  getUser = async () => {
    const userDocument = await Firestore()
      .collection("users")
      .doc("FDmjVl8ZcK6GkFkHyYA0")
      .get();
    console.log(userDocument);
  };
}

export default FirebaseApp;
