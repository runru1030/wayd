import REACT from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import UesrProfile from "routes/UesrProfile";
import Alert from "routes/Alert";

const AppRouter = ({ isLoggedin, userObj, refreshUser, ProfileObj }) => {

    return (
        <Router>
            {isLoggedin && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedin ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj} refreshUser={refreshUser} ProfileObj={ProfileObj} />
                        </Route>
                        <Route exact path="/userProfile">
                            <UesrProfile userObj={userObj} />
                        </Route>
                        <Route exact path="/alert">
                            <Alert userObj={userObj} />
                        </Route>
                    </>
                ) : (
                    <Route exact path="/">
                        <Auth />
                    </Route>

                )}
            </Switch>
        </Router>
    );
}
export default AppRouter;