import './Dashboard.css';

export const Dashboard = (props) => {
    return (
        <div id="dashboard">
            <header>
                <h1 id="dashHead">
                    Welcome to Book-A-Trainer!
                </h1>
            </header>
            <div id="dashBody">
                <div id="dashSegment">
                    <div id="dashSegmentText">
                        <h3 id="dashSegmentHead">
                            Find the right trainer for you!
                        </h3>
                        Browse through a large community of highly-rated trainers near you
                    </div>
                    <img id="dashSegmentImg" src={assisting}></img>
                </div>
                <div id="dashSegment">
                    <div id="dashSegmentText">
                        <h3 id="dashSegmentHead">
                            Write reviews for your favorite trainers!
                        </h3>
                        Every trainer has a public page where you can leave feedback and comments, along with a rating
                    </div>
                    <img id="dashSegmentImg" src={talking}></img>
                </div>
                <div id="dashSegment">
                    <div id="dashSegmentText">
                        <h3 id="dashSegmentHead">
                            Join us as a trainer yourself!
                        </h3>
                        Make a trainer account and personalize it so prospective clients can find you easier
                    </div>
                    <img id="dashSegmentImg" src={smiling}></img>
                </div>
            </div>
        </div>)
};