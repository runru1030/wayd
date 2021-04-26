import REACT from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import UesrProfile from "routes/UesrProfile";
import Alert from "routes/Alert";

const AppRouter = ({ isLoggedin, getMyProfile, ProfileObj }) => {

    return (
        <Router>
            {isLoggedin && <Navigation ProfileObj={ProfileObj} />}
            <Switch>
                {isLoggedin ? (
                    <>
                        <Route exact path="/">
                            <Home ProfileObj={ProfileObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile getMyProfile={getMyProfile} ProfileObj={ProfileObj} />
                        </Route>
                        <Route exact path="/userProfile">
                            <UesrProfile ProfileObj={ProfileObj} />
                        </Route>
                        <Route exact path="/alert">
                            <Alert ProfileObj={ProfileObj} />
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