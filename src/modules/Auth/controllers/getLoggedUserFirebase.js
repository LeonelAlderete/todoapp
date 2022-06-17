import firebaseApp from "../../../utils/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

const getLoggedUserFirebase = async (
  dispatch,
  setLoggedUserData,
  setShowLoading
) => {
  try {
    //Buscar usuario logeado
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const authData = {
          email: user.email,
          userID: user.uid,
        };

        dispatch(setLoggedUserData(authData));

        setShowLoading(false);
      } else {
        const authData = {
          email: null,
          userID: null,
        };

        dispatch(setLoggedUserData(authData));

        setShowLoading(false);
      }
    });
  } catch (error) {
    const authData = {
      email: null,
      userID: null,
    };

    dispatch(setLoggedUserData(authData));

    setShowLoading(false);

    console.log(error);
  }
};

export default getLoggedUserFirebase;
